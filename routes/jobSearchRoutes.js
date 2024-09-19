// route for applying to jobs by students
const express = require('express');
const {searchJobs} = require('../controllers/jobSearchController');





const router = express.Router();

//Define routes

//route for apply for jobs posted in the portal
router.post('/searchJob',searchJobs);



module.exports = router;