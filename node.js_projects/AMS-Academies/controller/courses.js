const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asynchandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');


//  @desc           GET all Courses
//  @route          GET /api/v1/courses
//  @route          GET /api/v1/bootcamps/:bootcampId/courses
//  @access         Public 
exports.getCourses = asynchandler( async (req, res , next) => {

    res.status(200).json(res.advancedResults)
    

    // get all courses with a specific bootcamp-ID
    if(req.params.bootcampId){
    
        const courses = await Course.find({ bootcamp: req.params.bootcampId }).populate({
        // this shows that the bootcamp propperty in documet will be showing values from its primary key document 
        path: 'bootcamp',
        select: 'name description'
    });
    res.status(200).json({
        success:true,
        count: courses.length,
        data: courses
    })
    }
    else{
        res.status(200).json(res.advancedResults)
    }
})


//  @desc           GET Single Course
//  @route          GET /api/v1/:courseId
//  @access         Public 
exports.getCourse = asynchandler( async (req, res , next) => {
    
        const course = await Course.findById({ _id: req.params.id }).populate({
            path: 'bootcamp',
            select: 'name description'  
        })
        
        if(!course){
            return next(new ErrorResponse(`cant find course with id ${req.params.id}`,400))
        }

    res.status(200).json({
        success: true,
        data:course
    })

})


//  @desc           create a Course
//  @route          Post /api/v1/bootcamp/:bootcampId/courses
//  @access         Private 
exports.addCourse = asynchandler( async (req, res , next) => {
    console.log("in add coursees")
    const bootcamp = await Bootcamp.findById({ _id : req.params.bootcampId })
    req.body.user = req.user.id;

    if(!bootcamp){
        return next(new ErrorResponse(`No bootcamp exists with given ID: ${req.params.bootcampId}`,400))
    }

    if(req.user.id !== bootcamp.user.toString() && req.user.role !== 'admin'){
        return(
            next(
                new ErrorResponse("only Owner of the bootcamp can add the courses to this bootcamp")
            )
        )
    }

    const course = await Course.create(req.body)

res.status(200).json({
    success: true,
    data:course
    })
})



//  @desc           delete a Course
//  @route          PUT /api/v1/bootcamp/:bootcampId/courses
//  @access         Private 
exports.deleteCourse = asynchandler( async (req, res , next) => {

    console.log("in delete coursees")

    const course = await Course.findById({ _id : req.params.id })
    
    
    if(req.user.id !== course.user.toString() && req.user.role !== 'admin'){
        return(
            next(
                new ErrorResponse("only Owner of the Course can Delete the courses to this bootcamp")
            )
        )
    }

    if(!course){
        return next(new ErrorResponse(`No bootcamp exists with given ID: ${req.params.bootcampId}`,400))
    }
    course.remove();
    console.log("this is my req.body object".red)
    console.log(req.body)


res.status(200).json({
    success: true,
    data:course
    })
})



//  @desc           update a Course
//  @route          PUT /api/v1/course/:id
//  @access         Private 

exports.updateCourse = asynchandler( async (req, res , next) => {

    console.log("in update courses")
    let course = await Course.findById(req.params.id)


    if(!course){
        return next(new ErrorResponse(`No course found with giv en ID: ${req.params.bootcampId}`,400))
    }

       
    if(req.user.id !== course.user.toString() && req.user.role !== 'admin'){
        return(
            next(
                new ErrorResponse("only Owner of the Course can update the courses to this bootcamp")
            )
        )
    }

    console.log("this is my content to update")
    console.log(req.body)

    course = await Course.findByIdAndUpdate(req.params.id , req.body , {
            new:true,
            runValidators:true
    })

res.status(200).json({
    success: true,
    data:course
    })
})


