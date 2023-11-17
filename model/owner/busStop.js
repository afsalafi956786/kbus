import mongoose  from "mongoose";


const busStopSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const BusStop = mongoose.model('BusStop',busStopSchema);
export default BusStop;
