// route for viewing all the job posted by companies
const express = require('express');
const {jobUpdate} = require('../controllers/jobDetailsUpdateController');





const router = express.Router();

//Define routes

//route for companies to  update job details
router.post('/jobUpdate',jobUpdate);



module.exports = router;