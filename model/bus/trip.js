import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    busId:{
        type:Number,
    },
    rootId: {
        type:Number,
    },
    departureTime: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Trip = mongoose.model('trip', tripSchema);

export default Trip;
