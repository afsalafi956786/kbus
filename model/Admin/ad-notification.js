import mongoose  from "mongoose";

const schema = new mongoose.Schema({
  busId:{
    type:String,
  },
  message:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'Pending'
  },
  notificationType:{
    type:String,
  },
  read:{
    type:Boolean,
    default:false
  },
  
}, {
  timestamps: true, // Use the timestamps option to automatically add createdAt and updatedAt fields
});

const noficationSchema = mongoose.model('ad-notification', schema);

export default noficationSchema;