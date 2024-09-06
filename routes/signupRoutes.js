// route for sign up
const express = require('express');
const upload= require('../config/utils/upload')
const {signupSchool,signupStudent,signupCompany}= require('../controllers/signupController');


const router = express.Router();

//Define routes

//route for signup of schools
//router.post('/signupSchool',signupSchool);
router.post('/signupSchool', upload.single('school_logo'), signupSchool);
//this line tells Express to first handle the file upload with multer before invoking the 'signupSchool' controller


//route for signup of students
router.post('/signupStudent',signupStudent);

//route for signup of companies
router.post('/signupCompany',upload.single('company_logo'),signupCompany);


module.exports = router;