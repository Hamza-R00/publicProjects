const mongoose = require('mongoose');
const ck = require('ckey')

const connectDb = async () => {
    const mu = ck.MONGO_URI
const conn = await mongoose.connect( mu , {
    
})

console.log(`mongoDB Connected :) : ${conn.connection.host}`.cyan.underline.bold)

} 

module.exports = connectDb