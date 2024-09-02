// route for sign up
const express = require('express');
const {companyJobPost}= require('../controllers/companyJobPostController');


const router = express.Router();

//Define routes

//route for companies to post job details in the portal
router.post('/companyJobPost',companyJobPost);



module.exports = router;