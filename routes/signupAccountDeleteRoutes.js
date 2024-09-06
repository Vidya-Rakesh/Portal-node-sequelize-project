// route for deleting signup accounts
const express = require('express');
const {signupAccountDelete} = require('../controllers/signupAccountDeleteController');





const router = express.Router();

//Define routes

//route for users to delete their account
router.post('/signupAccountDelete',signupAccountDelete);



module.exports = router;