// route for deleting job posted by companies
const express = require('express');
const {signupAccountDelete} = require('../controllers/signupAccountDeleteController');





const router = express.Router();

//Define routes

//route for companies to delete jobs posted in the portal
router.post('/signupAccountDelete',signupAccountDelete);



module.exports = router;