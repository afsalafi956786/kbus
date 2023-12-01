import mongoose  from "mongoose";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  
}, {
  timestamps: true, // Use the timestamps option to automatically add createdAt and updatedAt fields
});

const AdminSchema = mongoose.model('admin', schema);

export default AdminSchema;
