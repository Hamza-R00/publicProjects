// "npm run dev" for running the node server 


const colors = require('colors')
const fs = require('fs')
const mongoose = require('mongoose')
const ck = require('ckey');

const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');

const mu = ck.MONGO_URI

mongoose.connect(mu)

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

// import to database

const importData = async () => {
    try{
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        await User.create(users)

        console.log('data Imported...'.green.inverse)
        process.exit();
    }catch(err){
        console.log("error from seerer")
        console.log(err);
    }

}

// deleteData

const deleteData = async () => {
    try{
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();

        console.log("data Destroyed".red.inverse)
        process.exit()
    }catch(err){
        console.log(err)
    }   
}

if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}