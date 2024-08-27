// route for login
const express = require('express');
const {login, adminLogin} = require('../controllers/loginController');


const router = express.Router();

//Define routes


router.post('/login',login);
router.post('/adminLogin', adminLogin)

module.exports = router;