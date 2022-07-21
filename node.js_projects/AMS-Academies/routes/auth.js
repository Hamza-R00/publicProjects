const express = require('express');
// we need to bring methods so we will need use destructuring.
const {register, login, getMe} = require("../controller/auth");
const { protect } = require('../middleware/auth');
const { route } = require('./courses');
const router = express.Router()


router.post('/register' , register)
router.post('/login' , login)
router.get('/me' ,protect, getMe)


module.exports = router