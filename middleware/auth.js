import jwt from 'jsonwebtoken';



export async function verifyToken (req,res,next){
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({ message: 'Token not found' });
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode,'decode')
        req.userId = decode.userId;

        next();

    }catch(error){
        console.log(error.message)
        return res.status(401).json({ message: 'Invalid token' });
    }
}

