const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');



const adminSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, "please add a name"],
  },

  designation: {
    type: String,
    required: [true , "please enter you designation"],
    },

  email: {
    type: String,
    required: [true, "please add a email"],
    unique: true, // `email` must be unique
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please add a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "please add a password"],
    minlength: 6,
    // select is very important, this field is never selcted for a fetch required if true
    select: false,
  },

  createdAt:{
    type: Date,
    default: Date.now,
    }

});

adminSchema.pre("save" ,async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})

adminSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}


adminSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

module.exports = mongoose.model("Admin" , adminSchema);