const express = require('express')

const { getCourses ,getCourse , addCourse , updateCourse, deleteCourse}  = require('../controller/courses');

const advancedResults = require('../middleware/advanceResults');
const { protect , authorize } = require('../middleware/auth');
const Course = require("../models/Course")

const  router = express.Router({mergeParams: true})

router.route('/')
.get(advancedResults(Course ,{
    path: 'bootcamp',
    select: 'name description',
}), getCourses)
.post(protect , authorize('publisher'), addCourse);

router.route('/:id')
.get(getCourse).put(protect ,authorize('publisher','admin' ), updateCourse)
.delete(protect ,authorize('publisher','admin' ), deleteCourse);

module.exports = router;
