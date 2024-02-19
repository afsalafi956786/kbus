import express from 'express';
const app= express();
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './connection/dbConnect.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './Routes/userRouter.js'
import adminRouter from './Routes/adminRouter.js'



const PORT = process.env.PORT;
const data_connection = process.env.DATA_BASE_CONNECTION;
connectDb(data_connection);


//middle ware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );

//Routes
app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter)







app.use((err,req,res,next)=>{
    console.log(err.message);
    return res.status(500).json({ message:'Internal server error'})
})


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
