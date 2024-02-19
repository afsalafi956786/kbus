import mongoose from "mongoose";



const busDetailsSchema = new mongoose.Schema({
    busId:{
        type: Number,
        unique: true,
        maxlength: 8,
        default: ''
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
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'], // Ensures only Point type is accepted
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Longitude and latitude
            default: [0, 0] // Default coordinates
        }
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }

},{
    timestamps:true
})


// Index the currentLocation field for efficient spatial queries
busDetailsSchema.index({ currentLocation: '2dsphere' });


// Manually increment the useId before saving the document
busDetailsSchema.pre('save', async function (next) {
    try {
      // Check if the document is newly created or being updated
      if (this.isNew) {
        const busModel = mongoose.model('busData', busDetailsSchema);
  
        let uniqueId;
        let isUniqueIdFound = false;
  
        // Generate a unique 6-digit number
        do {
            uniqueId = String(Math.floor(10000000 + Math.random() * 90000000)); // Generates a random 6-digit number
          const existBus = await busModel.findOne({ busId: uniqueId });
  
          // Check if the generated ID is already in use
          if (!existBus) {
            isUniqueIdFound = true;
          }
        } while (!isUniqueIdFound);
  
        this.busId = uniqueId; // Set the unique 6-digit ID
      }
  
      next();
    } catch (error) {
      next(error);
    }
  });


const busData = mongoose.model('busData',busDetailsSchema);
export default busData;