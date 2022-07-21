const mongoose = require("mongoose");

// this wil inclide


/* 
1- updatedAt
2- location
3- temperature
4- wind
5- visibility
6- AQI

*/ 
const weatherSchema = mongoose.Schema({

    updatedAt:{
        type: Date,
        default: new Date().toLocaleString({ weekday: 'long' }).replace(',','')
    },

    location:{
        type:String,
        required:[true , "location is mising"],
    },

    temperature:{
        type:Number,
        required:[true , 'temperature is missiong'],
    },
    wind:{
        type:Number,
    },
    visibility:{
        type:Number,
    },

})

module.exports = mongoose.model('weather' , weatherSchema)