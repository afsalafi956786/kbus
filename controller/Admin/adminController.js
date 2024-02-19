import ADMIN from '../../model/Admin/admin.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const createAdmin = async (req,res,next)=>{
    try{
      const {email,password} =req.body;
      console.log(email,password)
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password,salt)
  
      await ADMIN.create({
        email,
        password :hashPassword,
      })
  
      return res.status(200).json({ message:'admin created'})
  
    }catch(error){
        next(error);
    }
  }


  export async function AdminLogin (req,res,next){
    try{
        const { email ,password }= req.body;

        
        if(!email){
            return res.status(404).json({ message: 'email required' });
        }

        if(!password){
             return res.status(404).json({ message: 'password required' }); 
        }
        

        const admin =await ADMIN.findOne({ email });
        if(!admin){
            return res.status(401).json({ message:"Admin Not found"})
        }

       // Compare the provided password with the hashed password
        const isCompare = await bcrypt.compare(password, admin.password);

         if (!isCompare) {
        return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: admin._id,email:admin.email},process.env.JWT_SECRET,{expiresIn:'60d'});
 
        return res.status(200).json({ message:'Login successful',token,admin })

    }catch(error){ 
        next(error);

    }
  }


  export async function AdminDetails (req,res,next){
    try{

      const adminId = req.userId;
      const admin = await ADMIN.findById( adminId );

      if(!admin){
        return res.json(null)
      }
      return res.status(200).json({ admin });

    }catch(error){
      next(error);
    }

  }
  



