// only make this class and use its in serve.js after all middlewares.
// as we use to try and catch error we have to call next and pass error as param then it will work 
//  but these errors are nor displayed in a decent way thus we use errohandle
// now the error is automatically catched and its is shown in a very decent way.

const ErrorResponse = require("../utils/errorResponse")


// next in the catch of any promise/statment will lead the execution to here 
// thus this will generate an error response and front will receive an responce which will tell
// the specific error due to the custom error response in util folder

const errorHandler = (err ,  req ,res , next) => {
    
    // log to console for the developer
    let error =  { ...err }
    error.message = err.message
    console.log(err)
    

    if(err.name === 'CastError'){
        const message = `Resource not found with id ${err.value}`
        error = new ErrorResponse(message , 404)
    }

    if(err.code === 11000){
        const message = `duplicate key as ${Object.keys(err.keyValue)[0]} is taken`
        error = new ErrorResponse(message , 400)
    }

    // validation error
    if(err.name === "ValidationError"){
        // multiple validation such as name , address etc are missing
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success : false,
        error : error.message || 'server error',
        // obj: 
    })
}


module.exports = errorHandler 