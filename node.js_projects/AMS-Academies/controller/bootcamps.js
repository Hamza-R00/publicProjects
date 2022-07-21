const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asynchandler = require('../middleware/async')
const geocoder = require('../utils/geocoder');

//  @desc           GET all Bootcamps
//  @route          GET /api/v1/bootcamps
//  @access         Public 
exports.getBootcamps = asynchandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)

    // all of this following work has been done in advanceResults.
    
    // let query;
    // // this is how an JSON Object manupulation is done.
    // // converting a query into a string so that we can replace its values and then could be manuplated
    // // ONLY FIRST MATCH is replaced.
    // let queryStr = JSON.stringify(req.query)
    
    // // This list contains the values which will be matched for properties in a bootcamp schema.
    // // we remove these values and later we check these in if() statments as aff these function(select , sort)
    // // to the query. these are the function
    // let removeValue = ['select' , 'sort' , 'limit' , 'page']

    // // making another copy of pagination.
    // let queryCopy = { ...req.query }
    
    // // deleting values from the query copy 
    // // here queryCopy[params] is equals to queryCopy.select||queryCopy.'params' as queryCopy will have
    // //  obj with propertoies of select, sort ,limit etc.
    // removeValue.forEach(params => delete queryCopy[params])    
    
    // // once fucntions are removed query is checked for logical operation and in api request we 
    // // give locical function keyword as gt , lt etc , this keyword should have a $ sign in front of it to 
    // // be exececuted in the query, this is how mongoose understands it
    // queryStr = queryStr.replace(/\b(gt|lt|lte|gte|in)\b/ , match => `$${match}`);

    // queryStr = JSON.parse(queryStr)

    // query = Bootcamp.find(queryStr).populate({
    //     path:'courses',
    //     select: 'title tuition description'
    // });

    // // query is always in the form of a JSON Object
    // if (req.query.select){

    //     const fields = req.query.select.split(',').join(' ');
    //     console.log("type of fields")
    //     console.log(typeof fields)
    //     // query = Bootcamp.select(fields)
    //     query = query.select(fields)
    // }


    // if(req.query.sort){
         
    //      const sortBy = req.query.sort.split(',').join(' ');
    //      console.log("my sort bys are ")
    //      console.log(sortBy);
    //      query = query.sort(sortBy)

    //     }

    // // req.query is an JSON object so page no we need to specify in to an Integer
    // // here page os used by startIndex/end index to make number of pages according to limit given in request
    // // note # of pages depends on limit of documents per page
    // const page = parseInt(req.query.page , 10) || 1;
    // const limit = parseInt(req.query.limit, 10) || 100;

    // // startingIndex and endingindex is as its formula for pagination remember.
    // const startingIndex = (page -1) * limit
    // const endingIndex = page * limit;
    // const total = await Bootcamp.countDocuments()

    // pagination = {}
    
    // if( endingIndex < total){
    //     pagination.next = {
    //         page : page + 1,
    //         limit
    //     }
    // }

    // if(startingIndex > 0){
    //     pagination.prev ={
    //         page: page - 1,
    //         limit,
    //     }
    // }

    // query = query.skip(startingIndex).limit(limit)

    // const bootcamp = await query
    
})

//  @desc           GET single Bootcamps
//  @route          GET /api/v1/bootcamps/:id
//  @access         Public 

exports.getBootcamp = asynchandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id).populate('user')

    // when format of given id is right but it does not existis so we dont get data back.
    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp cant be found with id ${req.params.id}`, 404)
        )
    }

    return res.status(200).json({
        success: true,
        data: bootcamp
    })

})

//  @desc           create  Bootcamps
//  @route          POST /api/v1/bootcamp
//  @access         Private 
exports.createBootcamp = asynchandler(async (req, res, next) => {
    // adding user to req.body
    req.body.user = req.user.id
    
    // check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user:req.user.id })

    if( publishedBootcamp && req.user.role !== 'admin'){

        return(
            next( new ErrorResponse(`the User with ID ${req.user.id} has already published a bootcamp` , 400))
        )
    }

    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
        success: true,
        data: bootcamp,
    })

})


//  @desc           Update Bootcamps
//  @route          PUT /api/v1/bootcamps/:id
//  @access         Private 
exports.updateBootcamp = asynchandler(async (req, res, next) => {
  

    var bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp cant be found with id ${req.params.id}`, 404)
        )
    }

    if(req.user.id === bootcamp.user.toString()){
        console.log("same user".bgCyan)
    }

    if(req.user.id !== bootcamp.user.toString() && req.user.role !== 'admin'){
        return(
            next( new ErrorResponse(`User ${req.user.name} is not the Owner of this bootcamp thus not authorized to update it` , 404))
        )
    }

    const query = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        // these are the validations on res object
        new: true,  // tells to return new value.
        runValidators: true,
    })

    bootcamp = await query.populate({ path: 'user', select: 'name' })   


    res.status(200).json({
        success: true,
        data: bootcamp,
    })

    next();

})

//  @desc           Delete Bootcamps
//  @route          Delete /api/v1/bootcamps/:id
//  @access         private 
exports.deleteBootcamp = asynchandler( async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(
            new ErrorResponse(`bootcamp cant be found with id ${req.params.id}`, 404)
        )
    }
    // checking if the only owner is deleting it
    if(req.user.id !== bootcamp.user.toString() && req.user.role !== 'admin'){
        return(
            next( new ErrorResponse(`User ${req.user.name} is not the Owner of this bootcamp thus not authorized to update it` , 404))
        )
    }
    // we have to re
    bootcamp.remove()

    res.status(200).json({
        success: true,
        data: {},
    })
})


//  @desc           get Bootcamops within a Radius
//  @route          GET /api/v1/bootcamps/radius/:zipcode/:distance
//  @access         private 
exports.getBootcampsInRadius = asynchandler( async (req, res, next) => {

    const { zipcode , distance } = req.params;
    
    console.log("my params of ZipCode , Distance are")
    console.log(zipcode)
    console.log(distance)
    const loc = await geocoder.geocode(zipcode)

    const lat = loc[0].latitude
    const long = loc[0].longitude
    console.log("My longitude is " + long)
    console.log("My Latitude is " + lat)

    const radius = distance/3963
    console.log("radius is")
    console.log(radius)  

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [ [ long , lat] , radius  ] }}
    })

    console.log("this is my bootcamps".red.inverse)
    console.log(bootcamps);

    res.status(200).json({

        success: true,
        count: bootcamps.length,
        bootcampObj : bootcamps,
        
    })


})