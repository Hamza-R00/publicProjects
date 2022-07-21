// "npm run dev" for running the node server
// password for hamza is 123456
// password for gull is EEE12345
const express = require('express')

const errorHandler = require('./middleware/error')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")

const connectDb = require('./config/db');

const dotenv = require('dotenv')

const colors = require('colors')

const bootcamps = require('./routes/bootcamps');

const courses = require('./routes/courses');
const auth = require('./routes/auth');
const user = require('./routes/user');


// load env vars
dotenv.config({path : './config/config.env'});

connectDb();

const app = express();

// body parser
app.use(express.json())

// uses cookies 
app.use(cookieParser())

if(process.env.NODE_ENV === 'development'){

    app.use(morgan('dev'))
}


// mount routers
// we must include very first / sign
app.use('/api/v1/bootcamps' , bootcamps)
app.use('/api/v1/courses' , courses)
app.use('/api/v1/auth' , auth)
app.use('/api/v1/user' , user)

app.use(errorHandler)

const PORT = process.env.PORT || 3001;


const server  = app.listen(PORT, 
    
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold)
    
    );
// handle unhandled promise rejections. piece of code that is usually necessary. as written as it is
process.on('unhandledRejection' , (err , promise) => {
    
    console.log(`Error : ${err.message}`.red);
    // close server and exit process
    server.close( () => process.exit(1) )

}) 