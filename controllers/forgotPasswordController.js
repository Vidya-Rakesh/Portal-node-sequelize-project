const db = require("../models/usersmodel")
const bcrypt = require('bcrypt');

const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
//const { validateEmail } = require('../config/utils/Validation');
const jwt = require('jsonwebtoken');

const secretKey =process.env.ACCESS_TOKEN_SECRET;
const getLocalisedString = require('../config/utils/localisationHandler');
const { emailService } = require('../config/utils/EmailService');
const {validateEmail} = require('../config/utils/Validation')


db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.school = require('../models/schoolmodel')(sequelize,DataTypes);
db.student=require('../models/studentmodel')(sequelize,DataTypes);
db.company = require('../models/companymodel')(sequelize,DataTypes);



//Fn to send a link of passwordchange to the user incase of forget password
const forgetPasswordEmail = async (req, res) => {

    const user_name  = req.body.user_name.toLowerCase();
   console.log({user_name});
    if(!validateEmail(user_name))
    {
      return res.status(400).json({message:'Please enter an email in email format'})
    }
    try {
   // Check if the email exists in the database
   const user = await db.users.findOne({ where: { user_name } });
   if (!user) {
     return res.status(404).json({ error: 'User not found' });
   }
          const userEmail = user.user_name;
       
  
  // Generate a unique token with an expiration timestamp (1 hour in this example)
  const token = jwt.sign({ user_name },secretKey, { expiresIn: '1h' });
  
  console.log(token);
  
  
    // Include the token in the reset password link
 const resetPasswordLink=`https://studentjobportal.com/NewPassword?token=${token}`;
  
  
  const params = {
    resetPasswordLink:resetPasswordLink
  };
  
  
  const emailContent = getLocalisedString('en', 'forgot_password',params);
  await emailService.sendEmail(userEmail, 'Forgot Password', emailContent, resetPasswordLink);
  
 
    
    
      // Check if the token is not expired
      if (Date.now() <= token.exp * 1000) {  
        res.status(200).json({message: "success"});
      } else {
        // Token has expired
        res.status(400).json({ error: 'Password reset link has expired or invalid' });
      }
   
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to fetch the event' });
    }
  };




  const updatePassword = async (req, res) => {
    const { newPassword, confirmPassword ,token} = req.body;
  
    try {
      //decodes the token along with secretkey
      const decoded = jwt.verify(token, secretKey);
  
      if (decoded && decoded.user_name) {
        const user = await db.users.findOne({ where: { user_name: decoded.user_name } });
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  //console.log({newPassword});
  //console.log({confirmPassword});
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        if (newPassword === confirmPassword) {
          // Update the user's password
          user.password = hashedPassword;
          await user.save();
          res.status(200).json({ message: 'Password reset successful' });
        } else {
          // Passwords do not match, send an error response
          res.status(400).json({ error: 'Passwords do not match' });
        }
      } else {
        res.status(400).json({ error: 'Invalid token' });
      }
  
    } catch (error) {
      console.error('Stack trace:', error.stack);
      if (error.name === 'TokenExpiredError') {
        // Handle token expiration
        res.status(401).json({ error: 'Token expired. Please request a new password reset.' });
      } else if (error.name === 'JsonWebTokenError') {
        // Handle invalid token
        res.status(400).json({ error: 'Invalid token' });
      } else {
        // Handle other errors
        console.error("Error:", error.message);
        res.status(500).json({ error: 'Unable to update password' });
      }
    }
  };

  module.exports= {forgetPasswordEmail, updatePassword}