const express = require('express')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controller/user');
const User = require("../models/User")


const advancedResults = require('../middleware/advanceResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect)
router.use(authorize('admin'))

router
    .route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router


