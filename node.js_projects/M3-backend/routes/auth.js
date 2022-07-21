const express = require('express');
// we need to bring methods so we will need use destructuring.
const {registerAdmin , loginAdmin }  = require('../controllers/adminAuth');
const {registerCommuter , loginCommuter} = require('../controllers/commuterAuth');
// const { protect } = require('../middleware/auth');
// const { route } = require('./courses');

const router = express.Router()


router.post('/register/admin' , registerAdmin)
router.post('/login/admin' , loginAdmin)

router.post('/register/commuter' , registerCommuter)
router.post('/login/commuter' , loginCommuter)





// router.post('/register' , register)
// router.post('/login' , login)
// router.get('/me' ,protect, getMe)


module.exports = router