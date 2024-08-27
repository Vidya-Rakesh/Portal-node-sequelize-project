// route for sign up
const express = require('express');
const {signupSchool,signupStudent,signupCompany}= require('../controllers/signupController');


const router = express.Router();

//Define routes

//route for signup of schools
router.post('/signupSchool',signupSchool);

//route for signup of students
router.post('/signupStudent',signupStudent);

//route for signup of companies
router.post('/signupCompany',signupCompany);


module.exports = router;