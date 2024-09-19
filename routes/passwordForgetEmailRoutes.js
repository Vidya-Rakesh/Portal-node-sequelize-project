// route for updating signup accounts
const express = require('express');
const upload= require('../config/utils/upload')
const {forgetPasswordEmail,updatePassword} = require('../controllers/forgotPasswordController');

const { authenticateAccessToken } = require('../config/utils/auth');



const router = express.Router();

//Define routes



//route for getting an email for forgot password

router.post('/forgetPasswordEmail',forgetPasswordEmail);



//route for updating the password through forgot password link
router.post('/updatePassword',updatePassword);






module.exports = router;