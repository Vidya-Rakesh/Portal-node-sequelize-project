//handles the login of any user who has an account


const db = require("../models/usersmodel");
const bcrypt = require('bcrypt');

const { validateEmail } = require('../config/utils/Validation');
const { Buffer } = require('buffer');
const { school, student } = require("../models/server");
//const request = require('request');



//fn to handle traditional username and password based authentication


const login = async (req, res) => {

 const userAgent = req.headers['user-agent'];
 console.log("user agent",userAgent);
  const query = { where: {} };
  const authHeader = req.headers.authorization;
  const userRole = {
    ADMIN:1,
    SCHOOL:2,
    STUDENT:3,
    COMPANY:4

};
  
  
  console.log({authHeader});
  if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing.' });
  }
  try {
      const decodedCredentials = Buffer.from(authHeader, 'base64').toString('utf-8');
      const [userlogin, password, ] = decodedCredentials.split(' ');
      
      if (userlogin) {
        if (validateEmail(userlogin)) {
            query.where.user_name = userlogin;
        }  else {
            return res.status(400).json({ message: 'Invalid input:  email not valid .' });
        }
    }

      const user = await db.users.findOne(query);
      if (!user) {
      return res.status(200).json({ message: 'Invalid email or password.' });
      }
      if (user.role === userRole.ADMIN) {
        return res.status(403).json({ message: 'You do not have permission to access this route.' });
    }
      if (validateEmail(userlogin)) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Your password does not match.' });

        }
      }
      const user_id= user.user_id;
      const query1={ where: {user_id} };
           if(user.role ===userRole.SCHOOL){
            
            const school = await db.school.findOne(query1);
            res.status(200).json({ message: 'Login successful.', user:user, school:school})
           }  
          else if(user.role ===userRole.STUDENT){
            const student = await db.student.findOne(query1);
            res.status(200).json({ message: 'Login successful.', user:user, student:student})
          }
          else if(user.role === userRole.COMPANY){
            const company = await db.company.findOne(query1);
            res.status(200).json({message: 'Login successful.',user:user, company:company})
          }
          } catch (error) {
      console.log(error.stack)
      res.status(500).json({ message: 'Error logging in.', error });
  }
};




 const adminLogin = async (req, res) => {

 const userAgent = req.headers['user-agent'];
 console.log("User Agent:", userAgent);
  
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

    const query = { where: {} };
    //const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing.' });
    }
    try {
        const decodedCredentials = Buffer.from(authHeader, 'base64').toString('utf-8');
        const [userlogin, password] = decodedCredentials.split(':');
        if (userlogin) {
          if (validateEmail(userlogin)) {
              query.where.email = userlogin;           
          } else {
              return res.status(400).json({ message: 'Invalid input:  email ' });
          }
      }
        const user = await db.users.findOne(query);
        if (user.role !== 1) {
          return res.status(403).json({ message: 'You do not have permission to access this route.' });
      }
        if (!user) {
        return res.status(200).json({ message: 'Invalid email or password.' });
        }
        if (validateEmail(userlogin)) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Your password does not match.' });
          }
        }

               
                res.status(200).json({ message: 'Login successful.', user})
    } catch (error) {
        console.log(error.stack)
        res.status(500).json({ message: 'Error logging in.', error });
    }
 };


 

 





module.exports = { adminLogin,login };

