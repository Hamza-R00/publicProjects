const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const CarSchema = mongoose.Schema({
  numericID: {
      type: Number,
      default: null,
        required: [true, "Please fill the Numeric part of your number plates"],
    },
    alphabeticID: {
      type: String,
      default: null,
        required: [true, "Please fill the Alphabetic part of your number plates"],
    },
});




const CommuterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
  },
  CNIC: {
    type: String,
    unique: true,
    required: [true, "please add your CNIC"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, "please add your Phone Number"],
  },
  carReg: {
    type:CarSchema,
    require: [ true, "please enter your car number" ]
  },

  lastLogin: {
    date: Date,
    car: CarSchema
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CommuterSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ CNIC: this.CNIC }, process.env.JWT_SECRET, {
    expiresIn: "1y",
  });
};

module.exports = mongoose.model("commuter", CommuterSchema);



  
