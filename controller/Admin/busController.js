
import BUS from '../../model/bus/busData.js';
import ROOTES from '../../model/bus/rootSchema.js';
import ADMIN  from '../../model/Admin/admin.js'



export async function addBusDetails (req,res,next){
    try{
        const { busName,busNumber,busColor,busType,ownerName,ownerPhone,assistentPhone,latitude, longitude } = req.body;

        const adminId = req.userId;

        const admin = await ADMIN.findOne({ _id:adminId  });
        if(!admin){
            return res.status(404).json({ message:'Admin not found!'})
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


        // Validate latitude and longitude
        if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
            return res.status(400).json({ message: 'Invalid latitude value' });
        }

        if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
            return res.status(400).json({ message: 'Invalid longitude value' });
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

        const busDetails = await BUS.create({
            busName: busName,
            busNumber: busNumber,
            busType:  busType,
            busColor: busColor ,
            ownerName:  ownerName,
            ownerMobile: ownerPhone,
            assistendPhone:  assistentPhone,
            currentLocation:{
                type:'Point',
                coordinates :[ longitude, latitude ]
            }
        });
        
        console.log(busDetails);
        return res.status(200).json({ message:'Route added successfully.', busDetails})

    }catch(error){
      next(error);
    }
  
  }



  export  async function addRootes (req,res,next){
    try{

        const { busId } = req.params;
        const { from , to , busStops } = req.body;

        const adminId = req.userId;

        const admin = await ADMIN.findOne({ _id:adminId  });
        if(!admin){
            return res.status(404).json({ message:'Admin not found!'})
        }

        if(!from){
            return res.status(400).json({ message: 'Please specify the departure location (from).' });
        }

        if(!to){
            return res.status(400).json({ message: 'Please specify the destination location (to).' });
        }

       const  existRoute= await ROOTES.findOne({ from : from, to: to, busStops: busStops});

        if (existRoute) {
            return res.status(400).json({ message: 'This route already exists' });
        }

        const bus = await BUS.findOne({ busId: busId });

        if(!bus){
         return res.status(404).json({ message: 'Bus not found' });
        }

        const root = await ROOTES.create({
            from: from,
            to: to,
            busStops: busStops
        });

       bus.rootes.push(root._id);
       await bus.save();

       return res.status(200).json({ message: 'Route added successfully' });



    }catch(error){
        
        next(error);
    }
  }


  export async function getAllBus (req,res,next){
    try{
        const adminId = req.userId;

        const admin = await ADMIN.findOne({ _id:adminId  });
        if(!admin){
            return res.status(404).json({ message:'Admin not found!'})
        }

        const buses = await BUS.find().sort({ createdAt: -1});
        if(!buses){
            return res.status(404).json({ message:'Not found bus' })
        }

        return res.status(200).json({ buses })

    }catch(error){
        next(error);
    }
  }