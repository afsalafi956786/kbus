import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
        required:true
    },

},{
    timestamps:true,
})

const Owner = mongoose.model('owner',ownerSchema);
export default Owner;