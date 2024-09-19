// route for login with google
const express = require('express');
const passport = require('../config/passport');
//const {googleLogin}= require('../config/passport');



const router = express.Router();

//Define routes

//route for users to login using google
//router.post('/googleLogin',googleLogin);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handles Google callback using a redirect link incase of authentication failure
/* router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5000/api/users/signupStudent' }),
    (req, res,next) => {
      console.log('req.user:',req.user);
        if(!req.user){
          console.log('Authentication failed. No user object found.')
          res.status(400).json({ message: 'Failed to retrieve user details' });
      
        }
        // Successful login, redirect to a desired route
      
     
        res.status(200).json({
          message:'login successfull',
         user:req.user.user,
        profile:req.user.profileData});
        
    }
  ); */
  router.get('/google/callback', 
    (req, res, next) => {
      passport.authenticate('google', (err, user, info) => {
        if (err) {
          console.error('Error during authentication:', err);
          return res.status(500).json({ message: 'An error occurred during authentication' });
        }
        
        if (!user) {
          console.log('Authentication failed. No user object found.');
          return res.status(400).json({ message: 'You donot have an account. Please signup!!!.' });
        }
  
        // If authentication is successful, proceed with user login
        req.login(user, (err) => {
          if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Login failed' });
          }
  
          // Successful login, return user info
          return res.status(200).json({ 
            message: 'Login successful',
            user: user.user, 
            profile: user.profileData 
          });
        });
      })(req, res, next); // Pass req, res, next to passport.authenticate
    }
  );
  

module.exports = router;