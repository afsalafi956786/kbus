import express from 'express';
const app= express();
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './connection/dbConnect.js';
import cors from 'cors';
import ownerRoter from './Routes/ownerRouter.js'
import bodyParser from 'body-parser';
import userRouter from './Routes/userRouter.js'



const PORT = process.env.PORT;
const data_connection = process.env.DATA_BASE_CONNECTION;
connectDb(data_connection);


//middle ware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use('/api/owner',ownerRoter);
app.use('/api/user',userRouter)







app.use((err,req,res,next)=>{
    console.log(err.message);
    return res.status(500).json({ message:'Internal server error'})
})







app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
