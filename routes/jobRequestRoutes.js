// route for applying to jobs by students
const express = require('express');
const {jobRequest} = require('../controllers/jobRequestController');





const router = express.Router();

//Define routes

//route for apply for jobs posted in the portal
router.post('/jobRequest',jobRequest);



module.exports = router;