import USER from '../../model/user/user.js'
import OTP from '../../model/OTP.js';
import jwt from 'jsonwebtoken';

export async function  userRegister (req,res,next){
    try{

        const {name,phone} = req.body;
        if(!name){   
            return res.status(404).json({message:'Please eneter your name!'}) 
        }
      //origng
        if(!phone){
            return res.status(404).json({message:'Please eneter phone number!'}) 
        }

        const existUser = await USER.findOne({ phone });
        if(existUser){
            return res.status(400).json({ message: 'This phone number has been already registered!' }); 
        }
        
        const otp = generateOTP();

         // Set the OTP expiration to 5 minutes from now
         const expiration = new Date(Date.now() + 5 * 60 * 1000);

         // Save the OTP to the database
         const otpEntry = new OTP({ phone, otp, expiration });
         await otpEntry.save();
 
         // Send the OTP to the user (e.g., via SMS or email)
          sendOTP(phone, otp);

          const user = new USER({
            name,
            phone
          })

          return res.status(200).json({ message:'OTP Sent Sucessfully',user})
        
    }catch(error){
     next(error)
    }
}


export async function userVerifyOTP (req,res,next){
    try{

        const obj = req.body;

        let otp = obj.otp;
        let phone = obj.phone;
        let name = obj.name;

        if(!otp){
            return res.status(404).json({ message:'Please enter the otp!'})
        }

         // Step 1: Find the latest OTP data from the temporary collection
         const latestOTP = await OTP.findOne({ phone,otp }).sort({ createdAt: -1 }); 
        
         // Step 2: Verify the OTP
         if (!latestOTP || latestOTP.otp !== otp || Date.now() > latestOTP.expiration) {
          return res.status(400).json({ message: 'Invalid OTP' });
          }     
          
          const user = new USER({
            name,
            phone
          })

          await user.save();

          const token = jwt.sign({userId:user._id , name:user.name,phone:user.phone},
            process.env.JWT_SECRET,
            {expiresIn:'1y'}
            );
            return res.status(200).json({ message:'Registration completed successfully',token,user})

    }catch(error){
        next(error)
    }
}

export async function userLogin (req,res,next){
    try{

        const { phone } = req.body;

        if(!phone){
            return res.status(404).json({ message:'Please enter your phone number!'})
        }

        const user = await USER.findOne({ phone });
        if(!user){
            return res.status(401).json({ message:'Phone number is not registered!'})
        }

        const otp = generateOTP();

           // Set the OTP expiration to 5 minutes from now
           const expiration = new Date(Date.now() + 5 * 60 * 1000); 

           // Save the OTP to the database
          // expiration
         const otpEntry = new OTP({ phone, otp, expiration }); // Include the expiration field
         await otpEntry.save();
  
         // Send the OTP to the user (e.g., via SMS or email)
          sendOTP(phone, otp,expiration); 

          return res.status(200).json({ message:'OTP Sent Sucessfully',user})

    }catch(error){
        next(error); 
    }
}

export async function userLoginVerify (req,res,next){
    try{

        const { phone, otp } = req.body;

        if(!otp){
            return res.status(404).json({ message:'Please enter the otp!'})
        }

         // Step 1: Find the latest OTP data from the temporary collection
         const latestOTP = await OTP.findOne({ phone,otp }).sort({ createdAt: -1 }); 
        
         // Step 2: Verify the OTP
         if (!latestOTP || latestOTP.otp !== otp || Date.now() > latestOTP.expiration) {
         return res.status(400).json({ message: 'Invalid OTP' });
        }
         
        const user = await USER.findOne({phone});

        const token = jwt.sign({userId:user._id,name:user.name,phone:user.phone},
            process.env.JWT_SECRET,
            {expiresIn:'1y'}
            )

            return res.status(200).json({ message:'Login successful',token,user})

    }catch(error){
        next(error); 
    }
}