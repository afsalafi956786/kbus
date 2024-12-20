import OWNER from '../../model/owner/owner.js';
import BUS from '../../model/bus/busData.js';
import ROOTES from '../../model/bus/rootSchema.js';
import crypto from 'crypto';
import ADMInNOTIFICATION from '../../model/Admin/ad-notification.js'



export async function ownerStartBus (req,res){
    try{

        const { busId , phone} = req.body;
        if(!busId){
            return res.status(400).json({ message:'Please enter the busId'})
        }

        if(!phone){
            return res.status(400).json({ message:'Please enter the phone number'})
        }

        const bus = await BUS.findOne({ busId });

        if(!bus){
            return res.status(404).json({ message:'Bus not found!'})
        }

        bus.driverNumber = phone;
        bus.save();
        return res.status(200).json({ message:"Bus Linked successfully"})
        
    }catch(error){
        next(error);
    }
}


export async function addBusDetails (req,res,next){
    try{
        const { busName,busNumber,busColor,busType,ownerName,ownerPhone,assistentPhone,latitude, longitude } = req.body;

        const ownerId =  req.userId ;
        console.log(ownerId,'owner id')

        const owner = await OWNER.findOne({ _id:ownerId  });
        if(!owner){
            return res.status(404).json({ message:'User not found!'})
        }
        
        if(!busName){
            return res.status(404).json({ message: 'Please enter bus name' });
        }
        if(!busNumber){
            return res.status(404).json({ message: 'Please enter bus number' });
        }
        if(!busColor){
            return res.status(404).json({ message: 'Please enter bus colore' });
        }
        if(!busType){
            return res.status(404).json({ message: 'Please enter bus type' });
        }
        if(!ownerName){
            return res.status(404).json({ message: 'Please enter owner name' });
        }
        if(!ownerPhone){
            return res.status(404).json({ message: 'Please enter owner phone' });
        }
        if(!assistentPhone){
            return res.status(404).json({ message: 'Please enter assistent phone' });
        }


        // // Validate latitude and longitude
        // if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
        //     return res.status(400).json({ message: 'Invalid latitude value' });
        // }

        // if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
        //     return res.status(400).json({ message: 'Invalid longitude value' });
        // }

        const existbusNum = await BUS.findOne({ busNumber: busNumber});
        if(existbusNum){
            return res.status(400).json({ message:'This bus number already added!'})
        }


        const existBusData = await BUS.findOne({
            busName: busName,
            busNumber: busNumber,
            busType:  busType,
            busColor: busColor ,
            ownerName:  ownerName,
            ownerMobile: ownerPhone,
            assistendPhone:  assistentPhone,
        });

        if(existBusData){
            return res.status(400).json({ message:"This bus details already added!"})
        }

         // Generate a unique busId
         const randomNum = crypto.randomInt(10000000, 99999999);
         const busId = `${busNumber}-${randomNum}`;

        const busDetails = await BUS.create({
            busId:busId,
            ownerId:ownerId,
            busName: busName,
            busNumber: busNumber,
            busType:  busType,
            busColor: busColor,
            ownerName:  ownerName,
            ownerMobile: ownerPhone,
            assistendPhone: assistentPhone,
        });


        const notificationData = {
            busId:busDetails.busId,
            message: `${busDetails.busName} added successfully just check the approvel`,
            status:'Pending',
            notificationType:'addBus',
        }

        await ADMInNOTIFICATION.create(notificationData);
        return res.status(200).json({ message:'Bus added successfully.', busDetails})

    }catch(error){
      next(error);
    }
  
  }



  export  async function addRootes (req,res,next){
    try{

        const { busId } = req.params;
        const { from , to ,startTime,reachTime, busStops } = req.body;

        const ownerId = req.userId;
       console.log(ownerId,'owener')
        const owner = await OWNER.findOne({ _id:ownerId  });
        if(!owner){
            return res.status(404).json({ message:'User not found!'})
        }
        if(!from){
            return res.status(400).json({ message: 'Please specify the departure location (from).' });
        }

        if(!to){
            return res.status(400).json({ message: 'Please specify the destination location (to).' });
        }

        if(!startTime){
            return res.status(400).json({ message: 'Please specify the starting time' });
        }
        if(!reachTime){
            return res.status(400).json({ message: 'Please specify the reaching time' });
        }

    //    const  existRoute= await ROOTES.findOne({ from : from, to: to, busStops: busStops});

        // if (existRoute) {
        //     return res.status(400).json({ message: 'This route already exists' });
        // }

        const bus = await BUS.findOne({ busId: busId });

        if(!bus){
         return res.status(404).json({ message: 'Bus not found' });
        }

        const root = await ROOTES.create({
            from: from,
            to: to,
            startTime,
            reachTime,
            busStops: busStops
        });

       bus.rootes.push(root._id);
       await bus.save();

       return res.status(200).json({ message: 'Route added successfully' });

    }catch(error){
        
        next(error);
    }
  }


  export async function getOneBusdetails(req,res,next){
    try{

        const { busId } = req.params;
        const bus = await BUS.findOne({ busId });
        if(!bus){
            return res.status(404).json({ message:'Bus not found'})
        }

        return res.status(200).json({ bus })

    }catch(error){
        next(error);
    }
  }

  export async function getOwnerbuses (req,res,next){
    try{
        const ownerId = req.userId;

        const owner = await OWNER.findOne({ _id:ownerId  });
        if(!owner){
            return res.status(404).json({ message:'User not found!'})
        }

        const buses = await BUS.find({ ownerId:ownerId }).sort({ createdAt: -1});
        if(!buses){
            return res.status(404).json({ message:'Bus not found!' })
        }

        return res.status(200).json({ buses })

    }catch(error){
        next(error);
    }
  }


  export async function getRooteParticularBus(req,res,next){
    try{
        const { busId } = req.params;
        const ownerId = req.userId;

        const owner = await OWNER.findOne({ _id:ownerId  });
        if(!owner){
            return res.status(404).json({ message:'User not found!'})
        }
        const busWithRoutes = await BUS.aggregate([
            {
                $match: { busId, ownerId } 
            },
            {
                $lookup: {
                    from: 'roots', 
                    localField: 'rootes', 
                    foreignField: '_id', 
                    as: 'routes' 
                }
            },
            {
                $project: {
                    _id: 0, 
                    busId: 1,
                    busName: 1,
                    busNumber: 1,
                    routes: 1 
                }
            }
        ]);

        if (busWithRoutes.length === 0) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Return the bus and its routes
        return res.status(200).json({
            bus: busWithRoutes[0] // Return the first result since we're matching by busId
        });

    }catch(error){
        next(error);
    }

  }