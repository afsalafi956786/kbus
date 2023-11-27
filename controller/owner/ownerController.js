import OWNER from '../../model/owner/owner.js'
import jwt from 'jsonwebtoken'

export async function RegisterCheck(req,res,next){
    try{
        const { name,phone } = req.body;
        console.log(req.body)
        
        if(!name){
            return res.status(404).json({message:'Please eneter your name!'})
        }
        if(!phone){
            return res.status(404).json({message:'Please eneter phone number!'}) 
        }

        const existPhone = await OWNER.findOne({ phone });
        if(existPhone){
            return res.status(400).json({ message: 'This phone number has been already registered!' }); 
        }

        const owner = new OWNER({
            name,
            phone
         });

         return res.status(200).json({ message:'success',owner})

    }catch(error){
        next(error);
    }
}

export async function RegisterOwner (req,res,next){
    try{

       const {otp,name,phone} = req.body

        // let otp = obj.otp;
        // let phone = obj.phone;
        // let name = obj.name;
        if(!otp){
            return res.status(404).json({ message:'Please enter the otp!'})
        }

        if(!name){
            return res.status(404).json({ message:'Name not found!'})
        }
        if(!phone){
            return res.status(404).json({ message:'phone not found!'})
        }

         const owner =  new OWNER({
            name,
            phone
         })
         await owner.save();
         const token = jwt.sign(
            { userId: owner._id, name: owner.name, phone: owner.phone },
            process.env.JWT_SECRET,
            { expiresIn: '1y' }
          );

          return res.status(200).json({ message:'Registration completed successfully',token,owner})
    }catch(error){
        next(error);  
    }
}


export async function loginCheck (req,res,next){
    try{
        const {phone} = req.body;

        if(!phone){
            return res.status(404).json({ message:'Please enter your phone number!'})
        }

        const owner = await OWNER.findOne({ phone });
        if(!owner){
            return res.status(401).json({ message: 'Phone number is not registered!' });
        }
        return res.status(200).json({ message:'success',owner})


    }catch(error){
        next(error); 
    }
}


export async function ownerLogin (req,res,next){
    try{
        const {phone,otp } =req.body;

        if(!otp){
            return res.status(404).json({ message:'Please enter the otp!'})
        }

         const owner = await OWNER.findOne({ phone });
              
         const token = jwt.sign(
            { userId: owner._id, name: owner.name, phone: owner.phone },
            process.env.JWT_SECRET,
            { expiresIn: '6M' }
          );

          return res.status(200).json({ message:'Login successful',token,owner})

    }catch(error){
        next(error); 
    }
}


export async function ownerAddBus (req,res,next){
    try{
        



    }catch(error){
        next(error); 
    }
}
