// route for updating signup accounts
const express = require('express');
const upload= require('../config/utils/upload')
const {schoolPasswordReset,studentPasswordReset,companyPasswordReset} = require('../controllers/userpasswordResetController');

const { authenticateAccessToken } = require('../config/utils/auth');



const router = express.Router();

//Define routes

//route for users to reset their password

//route for school to reset their password
router.post('/resetSchoolPassword',authenticateAccessToken,schoolPasswordReset);

//route for company to reset their password
router.post('/resetCompanyPassword',authenticateAccessToken,companyPasswordReset);

//route for student to reset their password
router.post('/resetStudentPassword',authenticateAccessToken,studentPasswordReset);






module.exports = router;