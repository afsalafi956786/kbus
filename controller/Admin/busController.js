
import BUS from '../../model/bus/busData.js';
import ADMIN  from '../../model/Admin/admin.js'
import ADMInNOTIFICATION from '../../model/Admin/ad-notification.js'



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



  export async function getAllNotification(req,res,next){
    try{

        const adminId = req.userId;

        const admin = await ADMIN.findOne({ _id:adminId  });
        if(!admin){
            return res.status(404).json({ message:'Admin not found!'})
        }

        const notificaton = await ADMInNOTIFICATION.find({ }).sort({ createdAt: -1 });

        if(!notificaton){
            return res.status(404).json({ message:'notification not found!'})
        }

        return res.status(200).json({ notificaton })

    }catch(error){
        next(error);
    }
  }
