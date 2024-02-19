import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    busStops: [{
        name: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });


const rootModel = mongoose.model('root', routeSchema);

export default  rootModel;
