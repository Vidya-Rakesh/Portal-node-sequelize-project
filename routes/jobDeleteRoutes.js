// route for deleting job posted by companies
const express = require('express');
const {jobDelete} = require('../controllers/jobDeleteController');





const router = express.Router();

//Define routes

//route for companies to delete jobs posted in the portal
router.post('/jobDelete',jobDelete);



module.exports = router;