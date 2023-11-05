import mongoose from "mongoose";

async function connectDb(data){
    try{
        await mongoose.connect(data,{dbName:'Kbus'});
        console.log('database connected successfully..');
        
    }catch(error){
        console.log(error.message)
    }
}

export default connectDb