// route for companies to access job requests
const express = require('express');
const {checkJobRquest} = require('../controllers/checkJobRequestController');





const router = express.Router();

//Define routes

//route for apply for jobs posted in the portal
router.post('/checkJobRequestbyCompany',checkJobRquest);



module.exports = router;