// route for viewing all the job posted by companies
const express = require('express');
const {jobView} = require('../controllers/JobViewController');





const router = express.Router();

//Define routes

//route for companies to view jobs posted in the portal
router.post('/jobView',jobView);



module.exports = router;