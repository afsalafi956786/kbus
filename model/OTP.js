import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  },
  isVerified:{
    type: Boolean, 
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const OTP = mongoose.model('otp', otpSchema);

export default OTP;