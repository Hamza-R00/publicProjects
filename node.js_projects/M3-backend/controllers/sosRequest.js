


const Commuter = require("../models/commuter");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const SOS = require('../models/sos')


const common = require('../utils/commonEventEmitter');
const { cyan } = require("colors");
const commonEvent = common.commonEmitter

//  @desc           Create Commuter
//  @route          POST /api/v1/auth/create/sosRequest
//  @access         private        ! -- as it not gona be a loggedin user or else it would be

exports.createSOS = asyncHandler( async (req,res,next) => {

  const { type , location } = req.body

  // console.log("in create SOS")
  // console.log(req.body)
  
  const existingRequest = await SOS.findOne({type : type , createdBy: req.commuter[0].id , status: 'Pending'})
  console.log("firing event now".bgCyan)
  commonEvent.emit('newSOS')

  if(existingRequest){

    return next(new ErrorResponse('you have already submitted the request', 400))

  }

  // console.log("this is the id of communter")
  // console.log(req.commuter[0].id)
  const createdBy = req.commuter[0].id
  
  const request = await SOS.create({
    
    type,
    location,
    createdBy,

  })  
  console.log("thi sis error in date.now one........")
  console.log(request)

  // console.log("This is the user who is sending Request")

  // console.log(req.commuter)

  res.status(200).json({
    success:true,
    request
  })

})


//  @desc           Create Commuter
//  @route          POST /api/v1/auth/create/sosRequest
//  @access         Public        ! -- as it not gona be a loggedin user or else it would be



exports.getSOS = asyncHandler( async (req,res,next) => {

const requests = await SOS.find({status:'Pending'}).populate('createdBy')

res.status(200).json({
  success:true,
  count:requests.length,
  requests,
})

})


exports.updateStatus = asyncHandler( async (req,res,next) => {

  const request = await SOS.findByIdAndUpdate(req.params.id, req.body, {
    // these are the validations on res object
    new: true,  // tells to return new value.
    runValidators: true,
})

res.status(200).json({
    success:true,
    changesRequest: request
})
})


