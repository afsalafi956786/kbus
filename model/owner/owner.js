import mongoose from "mongoose";


const ownerShcema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },

},{
    timestamps:true,
})

const Owner = mongoose.model('owner',ownerShcema);
export default Owner;