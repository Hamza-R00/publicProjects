const mongoose = require("mongoose");


const locationSchema = mongoose.Schema({

    lat:{
        type:String,
        
      default: null,
      required: [true, "Latitude is missing"],
    },  
    lng:{
        type:String,
        default: null,
        required: [true, "Longitude is missing"],
    }
})

const SOSSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["Police", "Mechanic", "Ambulance" , "Firefighter"],
    required: [true, 'SOS call type is missing'],
  },
  status:{
    type: String,
    enum:['Resolved' , 'Pending'],
    default: 'Pending',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.toLocaleString(),
    require:[true, "please attach the send details"],
  },
  
  location:{
    type: locationSchema,
    require:[true, "location is missing"],
  },

  createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:'commuter',
    required: true,
  },

  assignedTo:{
    type:mongoose.Schema.ObjectId,
    ref:'Admin',
    required: false,
  }

});




module.exports = mongoose.model("SOS", SOSSchema);
