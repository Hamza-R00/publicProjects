const io = require('socket.io')()
// const eventHandlers = require('./eventHandlers');
const common = require('../utils/commonEventEmitter')
const commonEvent = common.commonEmitter

io.on('connection' , (socket)=>{

    console.log('We are getting a NEW Connected '.red)

    if(commonEvent.listenerCount('newSOS') === 0)
    commonEvent.on('newSOS' , ()=> { 
        console.log('running only once'.bgGreen)
        io.emit('sos_admin' , "just do it")
    })
    
    console.log("event register count ")
    console.log(commonEvent.listenerCount('newSOS'))

    socket.on('sos', (msg)=> {

        console.log(msg)
        io.emit('emergency' ,'SEND BY SERVER TO ADMIN')
        // socket.emit('sos1' ,str)
    })


    socket.on('hello' , (e) => {
        console.log(e)
        socket.emit('hello' , "msg from server for admin in hello" )

    })
})

module.exports = io



// module.export = event