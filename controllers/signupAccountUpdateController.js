//********to update an account of a user(student/company/school)*******

//have to rewrite code
const db = require("../models/usersmodel");
const bcrypt = require('bcrypt');

const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
const { isValidPhoneNumber } = require('../config/utils/Validation');
const upload = require('../config/utils/upload'); 
const { validateEmail } = require('../config/utils/Validation');
const { Buffer } = require('buffer');
//const { school, student } = require("../models/server");



db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.school = require('../models/schoolmodel')(sequelize,DataTypes);
db.student=require('../models/studentmodel')(sequelize,DataTypes);
db.company = require('../models/companymodel')(sequelize,DataTypes);

//const request = require('request');

const userRole = {
    ADMIN:1,
    SCHOOL:2,
    STUDENT:3,
    COMPANY:4

};



/* const signupAccountUpdate = async (req, res) => {

 const userAgent = req.headers['user-agent'];
 console.log("user agent",userAgent);
  const query = { where: {} };
  const authHeader = req.headers.authorization;

 /*  const userRole = {
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
   
    
        let updatedValue;
        let updatedUser;
           if(user.role ===userRole.SCHOOL){
             const school_logo = `/uploads/${req.file.filename}`
             console.log({school_logo});
            const {
                school_name,
                school_address,
                school_location,
                } =req.body;

           // const currentUser = await db.users.findOne({
            //    where:{user_name},
             //   attributes:['user_id']
           // });
           // const user_id = currentUser? currentUser.user_id : null;
          // const user_id= user.user_id;

           // console.log({user_id});
            const currentSchool = await db.school.findOne({
                where :{user_id:user.user_id},
                attributes:['school_id']
            })
           // const school_id= currentSchool? currentSchool.school_id: null;
            if(!currentSchool){
                return res.status(400).json({message:'School not found'});
            }

           const school_id = currentSchool.school_id;

console.log({currentSchool});
         
            console.log({school_id});
           
           updatedValue= await db.school.update({
                school_name,
                school_address,
                school_location,
                school_logo},
               {where: {school_id:school_id}
            })

       // updatedUser=await db.users.update({
         //   where:{user_id:user_id},
           // })     
           
           console.log({updatedValue});
            res.status(200).json({ message: 'School account updated.',updatedValue,user,school})
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
           
           // updatedValue = await db.student.update({
           //student_name,student_course,student_phoneno}
             //  { where: {student_id:student_id}, 
           // })

           // updatedUser=await db.users.update({
             //        where:{user_id:user_id}, 
              //  })            
            res.status(200).json({ message: 'Student account updated.', updatedUser,updatedValue})

            
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
           
           // updatedValue = await db.company.update({
            //    where: {company_id:company_id}, 
           // })

            //updatedUser=await db.users.update({
               //      where:{user_id:user_id}, 
              //  })            
            res.status(200).json({ message: 'Company account updated.', updatedValue,updatedUser})

            

            }

          } catch (error) {
      console.log(error.stack)
      res.status(500).json({ message: 'Error logging in.', error });
                   }
      }; */

const signupSchoolUpdate =async (req,res) => {

    const userAgent = req.headers['user-agent'];
    console.log("user agent",userAgent);
    const query = { where: {} };
    const authHeader = req.headers.authorization;


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
   
    
        let updatedValue;
        //let updatedUser;
           if(user.role ===userRole.SCHOOL){
             const school_logo = `/uploads/${req.file.filename}`
             console.log({school_logo});

            const {
                  user_name,
                  password,
                school_name,
                school_address,
                school_location,
                } =req.body;

          
            const currentSchool = await db.school.findOne({
                where :{user_id:user.user_id},
                attributes:['school_id']
            })
          
            if(!currentSchool){
                return res.status(400).json({message:'School not found'});
            }

           const school_id = currentSchool.school_id;

            console.log({currentSchool});
         
            console.log({school_id});

            
           
           updatedValue= await db.school.update({
                school_name,
                school_address,
                school_location,
                school_logo},
               {where: {school_id:school_id}
            })

          
           
           console.log({updatedValue});

           // Fetch the updated school information
           const updatedSchool = await db.school.findOne({
            where: { school_id: school_id }
        });

       if(user_name && password)
        {
          const hashedPassword = await bcrypt.hash(password, 10);
          const updatedUser = await db.users.update({user_name:user_name,password:hashedPassword},{where:{user_id:user.user_id}})
         return res.status(200).json({message:'User credentials updated',user})
        }


            res.status(200).json({ message: 'School account updated.',user,updatedSchool})
           }  

}
catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Error logging in.', error });
                 }

}
const companySignupUpdate = async (req,res) =>{

  const userAgent = req.headers['user-agent'];
 console.log("user agent",userAgent);
  const query = { where: {} };
  const authHeader = req.headers.authorization;
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
         if(user.role === userRole.COMPANY)
          {

          const company_logo = `/uploads/${req.file.filename}`
         
          const{
            company_name,
            company_address,
            company_location,
            status}=req.body;

          

          const currentUser = await db.users.findOne({
              where:{user_name},
              attributes:['user_id']
          });
          
          const user_id =  currentUser.user_id;
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
         try{
          updatedValue = await db.company.update(
            {
              company_name,
              company_address,
              company_location,
              status,
              company_logo
            },
              {where: {company_id:company_id}}
           )
         }catch(error){
          if(error.name === 'SequelizeDatabaseError'){
            return res.status(400).json({message:`Only acceptable values for status is 'active','inactive'`,error:error.message});
        }
         }
         //fetch updated company
         const updatedCompany = await db.company.findOne({where:{company_id}})

          //updatedUser=await db.users.update({
             //      where:{user_id:user_id}, 
            //  })            
          res.status(200).json({ message: 'Company account updated.', updatedValue,updatedCompany})

        }

        }catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Error logging in.', error });
                 }
    }
      


const studentSignupUpdate = async (req,res) => {
    const userAgent = req.headers['user-agent'];
    console.log("user agent",userAgent);
     const query = { where: {} };
     const authHeader = req.headers.authorization;
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
      
       



    if(user.role === userRole.STUDENT){

        const {
            user_name,
            password,

            school_id,
            student_name,
            student_course,
            student_phoneno
            } =req.body;



       
       const user_id =user.user_id;
        const currentStudent = await db.student.findOne({
            where :{user_id},
            attributes:['student_id']
        })
        
        const student_id = currentStudent.student_id;
        if(!student_id){
            return res.status(400).json({message:'Student not found'});
        }

        console.log({student_id});
        const studentToUpdate = await db.student.findOne({ where: { student_id: student_id } });
if (!studentToUpdate) {
    return res.status(400).json({ message: 'No student found with the given ID.' });
}
console.log('Student to update:', studentToUpdate.dataValues);
console.log(`Updating student with ID: ${currentStudent.student_id}`);
       
       const updatedValue = await db.student.update({
                school_id,
                student_name,
                student_course,
                student_phoneno},
               { 
                where: {student_id:currentStudent.student_id}, 
        });
        //console.log(`Number of affected rows: ${updatedValue}`);
           
          const updatedStudent = await db.student.findOne({
            where: {student_id:student_id}
          })    ;   
        res.status(200).json({ message: 'Student account updated.',updatedStudent})

        
      }
    }catch(error){
        console.log(error.stack)
    res.status(500).json({ message: 'Error logging in.', error });
    }

}
module.exports = {signupSchoolUpdate,companySignupUpdate,studentSignupUpdate};