const mongoose = require('mongoose');

const connectDb = async () => { 
    const a = process.env.MONGO_URI
   
const conn = await mongoose.connect( a , {
    
})// console.log("Reached After connection")


console.log(`mongoDB Connected :) : ${conn.connection.host}`.cyan.underline.bold)

} 

module.exports = connectDb