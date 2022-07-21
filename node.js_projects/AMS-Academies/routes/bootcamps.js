
const express = require('express');
const advancedResults = require('../middleware/advanceResults')
const Bootcamp = require('../models/Bootcamp');
const { protect , authorize } = require('../middleware/auth')
const { getBootcamp,
        getBootcamps,
        createBootcamp ,
        updateBootcamp , 
        deleteBootcamp,
        getBootcampsInRadius
     } = require('../controller/bootcamps');

const courseRouter = require('./courses');

const router = express.Router();

router.use('/:bootcampId/courses' , courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/')
.get(advancedResults(Bootcamp, 'user'),getBootcamps)
.post(protect , authorize('publisher' , 'admin') ,createBootcamp)

router.route('/:id')
.put(protect ,authorize('publisher','admin' ),updateBootcamp)
.get(getBootcamp)
.delete(protect , authorize('publisher','admin' ),deleteBootcamp)

module.exports = router;
 