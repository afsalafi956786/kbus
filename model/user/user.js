import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
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

const User = mongoose.model('user',userSchema);
export default User;