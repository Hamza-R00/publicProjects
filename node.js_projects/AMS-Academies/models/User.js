


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: [true , 'please add a name']
    },
    
    email:{
        
        type:String,
        required: [true,'please add an email'],
        unique: true,

        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please add a valid email',
        ]
    },
    
    role:{
        type:String,
        enum: ['user' , 'publisher'],
        default: 'user',
    },
    
    password:{
        type:String,
        required:[true,'please add a password'],
        minlength: 6,
        // select is very important, this field is never selcted for a fetch required if true
        select: false
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    createdAt:{
        type: Date,
        default: Date.now,
    }
})

// its a Middleware
// encrypt password
UserSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt)
})


// methods vs static : methods is called on actual instance in case her its actual user.
UserSchema.methods.getSignedJwtToken = function(){

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// match password
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

module.exports = mongoose.model("User" , UserSchema);