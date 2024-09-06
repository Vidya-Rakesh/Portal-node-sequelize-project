// route for updating signup accounts
const express = require('express');
const upload= require('../config/utils/upload')
const {signupSchoolUpdate,studentSignupUpdate,companySignupUpdate} = require('../controllers/signupAccountUpdateController');





const router = express.Router();

//Define routes

//route for users to update their accounts

//route for school to update their account
router.post('/UpdateSchoolAccount',upload.single('school_logo'),signupSchoolUpdate);

//route for company to update their account
router.post('/updateCompanyAccount',upload.single('company_logo'),companySignupUpdate);

//route for student to update their account
router.post('/updateStudentAccount',studentSignupUpdate);

//router.post('/signupAccountUpdate',signupAccountUpdate );





module.exports = router;