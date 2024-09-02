//********to delete an account of a user*******


const db = require("../models/usersmodel");
const bcrypt = require('bcrypt');

const { validateEmail } = require('../config/utils/Validation');
const { Buffer } = require('buffer');
const { school, student } = require("../models/server");
//const request = require('request');





const signupAccountDelete = async (req, res) => {

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
      const [user_name, password, ] = decodedCredentials.split(' ');
      console.log({user_name});
      console.log({password});
      if (user_name) {
        if (validateEmail(user_name)) {
            query.where.user_name = user_name;
        }  else {
            return res.status(400).json({ message: 'Invalid input:  email not valid .' });
        }
    }

      const user = await db.users.findOne(query);
      if (!user) {
      return res.status(200).json({ message: 'No user with the given email id.' });
      }
      if (user.role === userRole.ADMIN) {
        return res.status(403).json({ message: 'You do not have permission to access this route.' });
    }
      if (validateEmail(user_name)) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Your password does not match.' });

        }
      }
   
    
        let deletedValue;
        let deletedUser;
           if(user.role ===userRole.SCHOOL){

            const currentUser = await db.users.findOne({
                where:{user_name},
                attributes:['user_id']
            });
            const user_id = currentUser? currentUser.user_id : null;
            const currentSchool = await db.school.findOne({
                where :{user_id},
                attributes:['school_id']
            })
            const school_id= currentSchool? currentSchool.school_id: null;
            if(!school_id){
                return res.status(400).json({message:'School not found'});
            }




         
            console.log({school_id});
           
            deletedValue = await db.school.destroy({
                where: {school_id:school_id},force:true
            })

        deletedUser=await db.users.destroy({
            where:{user_id:user_id},force:true
            })            
            res.status(200).json({ message: 'School account deleted.', deletedUser,deletedValue,user,school})
           }  


          else if(user.role ===userRole.STUDENT){




            const currentUser = await db.users.findOne({
                where:{user_name},
                attributes:['user_id']
            });
            const user_id = currentUser? currentUser.user_id : null;
            const currentStudent = await db.student.findOne({
                where :{user_id},
                attributes:['student_id']
            })
            const student_id= currentStudent? currentStudent.student_id: null;
            if(!student_id){
                return res.status(400).json({message:'Student not found'});
            }

            console.log({student_id});
           
            deletedValue = await db.student.destroy({
                where: {student_id:student_id}, force:true
            })

            deletedUser=await db.users.destroy({
                     where:{user_id:user_id}, force:true
                })            
            res.status(200).json({ message: 'Student account deleted.', deletedUser,deletedValue})

            
          }





          else if(user.role === userRole.COMPANY){

            const currentUser = await db.users.findOne({
                where:{user_name},
                attributes:['user_id']
            });
            const user_id = currentUser? currentUser.user_id : null;
            console.log({user_id});
            const currentCompany = await db.company.findOne({
                where :{user_id},
                attributes:['company_id']
            })
            const company_id= currentCompany? currentCompany.company_id: null;
            if(!company_id){
                return res.status(400).json({message:'Company not found'});
            }

            //console.log({company_id});
           
            deletedValue = await db.company.destroy({
                where: {company_id:company_id}, force:true
            })

            deletedUser=await db.users.destroy({
                     where:{user_id:user_id}, force:true
                })            
            res.status(200).json({ message: 'Company account deleted.', deletedUser,deletedValue})

            

            }

          } catch (error) {
      console.log(error.stack)
      res.status(500).json({ message: 'Error logging in.', error });
                   }
      };



module.exports = {signupAccountDelete};