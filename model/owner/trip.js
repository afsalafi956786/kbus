import mongoose from "mongoose";
import busStopSchema from './busStop.s'


const tripSchema = new mongoose.Schema({
    from :{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    busStops:[busStopSchema]

},{
    timestamps:true
})

const Trip = mongoose.model('Trip',tripSchema);

export default Trip;