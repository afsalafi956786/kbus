import mongoose from "mongoose";



const busDetailsSchema = new mongoose.Schema({
    busId:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    driverNumber:{
        type:Number,
        default:0
    },
    busName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    busNumber:{
        type:String,
        required:true
    },
    busType:{
        type:String,
        required:true,
    },

    busColor:{
        type:String,
        required:true
    },
    ownerMobile:{
        type:String,
        required:true
    },
    assistendPhone:{
        type:String,
        required:true
    },
    rootes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'root' }],

},{
    timestamps:true
})


const busData = mongoose.model('busData',busDetailsSchema);
export default busData;