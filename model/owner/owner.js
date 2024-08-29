import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
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