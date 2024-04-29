import express from 'express';
const app= express();
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './connection/dbConnect.js';
import bodyParser from 'body-parser';
import userRouter from './Routes/userRouter.js'
import adminRouter from './Routes/adminRouter.js'



const PORT = process.env.PORT;
const data_connection = process.env.DATA_BASE_CONNECTION;
connectDb(data_connection);


//middle ware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Routes
app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter)


app.post('/parsedata',(req,res)=>{

     // Handle GPS data here
     const gpsData = req.body;
     console.log(gpsData,'gps data recieved');

       // Process the received GPS data as per your application requirements
  // For example, you can save it to a database or perform any other operations

  res.status(200).json({ message: 'GPS data received successfully' });
})







app.use((err,req,res,next)=>{
    console.log(err.message);
    return res.status(500).json({ message:'Internal server error'})
})


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
