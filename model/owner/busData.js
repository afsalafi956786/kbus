import mongoose from "mongoose";
import tripSchema from './trip.js'



const busDetailsSchema = new mongoose.Schema({
    ownerName:{
        type:String,
    },
    busNumber:{
        type:String,
    },

    busColor:{
        type:String
    },
    ownerMobile:{
        type:String,
    },
    trips:[tripSchema]
},{
    timestamps:true
})

const busData = mongoose.model('busData',busDetailsSchema);
export default busData;