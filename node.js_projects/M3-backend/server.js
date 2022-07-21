
const express = require('express')
const http = require('http');
const errorHandler = require("./middleware/error")
const connectDb = require('./config/db')

const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const requestW_Api = require('./utils/apiCalling')
const em = require('./utils/commonEventEmitter')

const myEventEmitter = em.commonEmitter 
// routes paths

myEventEmitter.on('myevent', () => {
    console.log('hello from server.js in event emitter(commom)'.bgYellow)
})


const auth = require('./routes/auth')
const sosRequest = require('./routes/sosRequests')

// var routes = require('./routes/index')

const sockethandling = require('./controllers/dummy')
const io = require('./sockets/socket')

// load config
dotenv.config({path:'./config/config.env'})

// load DB
connectDb();
requestW_Api();
// routes comes here

const app = express();

const server = http.createServer(app)

app.use(express.json())

// uses cookies
app.use(cookieParser())

if(process.env.NODE_ENV === 'development'){

    app.use(morgan('dev'))
}

// enable cors  

app.use(cors());
  
// All routes goes here

app.get('/',(req , res , next) => {

    console.log("getting request in / ")

    res.json({
        dummy:true,
        success:true,
        name: 'hamza',
    })
})


app.use('/api/v1/auth/' , auth);
app.use('/api/v1/sosRequest/', sosRequest)
// app.use('api/v1/notification' , sockethandling)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

console.log(process.env.PORT)

// const server  = httpserver.listen(PORT, 

io.attach(server ,  {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }})

server.listen(PORT, 

        console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow)
    
    );
 
    // handle unhandled promise rejections. piece of code that is usually necessary. as written as it is
    process.on('unhandledRejection' , (err , promise) => {
    
    console.log(`Error : ${err.message}`.red);
    // close server and exit process
    server.close( () => {
        console.log("server has been closed".bgRed)
        process.exit(1)} )

}) 


