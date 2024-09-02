
const db = require ('../models/usersmodel');
const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
const { isValidPhoneNumber } = require('../config/utils/Validation');
const upload = require('../config/utils/upload'); 

db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.school = require('../models/schoolmodel')(sequelize,DataTypes);
db.student=require('../models/studentmodel')(sequelize,DataTypes);
db.company = require('../models/companymodel')(sequelize,DataTypes);

const userRole = {
    ADMIN:1,
    SCHOOL:2,
    STUDENT:3,
    COMPANY:4

};

//for signup of school
const signupSchool= async(req,res) => {
   // console.log('sign up of school route')
   console.log('File_info',req.file);
    const {user_id,
           user_name,
           password,
           school_id,
           school_name,
           school_address,
           school_location,
           } =req.body;
/*          console.log({user_id});
            console.log({role});
            console.log({user_name});
            console.log({password});
            console.log('User model:', db.users); */

    try{
        
        const hasUserWithUsername = await db.users.count({ where: {user_name}})
       
        if(hasUserWithUsername > 0){
            
            res.status(400).json({message:'Already existing user'})
            return
        }
       if(!password )
        {
            return res.status(400).json({message: 'Password is missing'});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
try{
     const school_logo = `/uploads/${req.file.filename}`

     console.log({school_logo});
            const user = await db.users.create(
                {user_id : user_id, 
                role: userRole.SCHOOL, 
                user_name:user_name, 
                password:hashedPassword})

           
            
           const school = await db.school.create(
                {user_id : user.user_id,
                school_id:school_id,
                school_name:school_name,
                school_address:school_address,
                school_location: school_location,
                school_logo:school_logo})
            res.status(200).json({message: 'School User created successfully.',
                user:user,
                school:school
               });

          
            } catch(error){
                console.log("Error creating user or school",error.message);
            }
        }
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError')
            {res.status(400).send("Email should be unique.Try another email id");
             } else if (error.name === 'SequelizeValidationError'){
           res.status(400).send("Enter an id in the email format");
             }
        res.status(500).json({message: 'Error creating user',error:error.message})
    }

}
//solve:the schoolid is not getting entered automatically in the student table from school table**********
//for signup of student
const signupStudent= async(req,res) => {

   
    const {user_id,
           user_name,
           password,
          
           student_id,
           student_name,
           student_course,
           student_phoneno,
           } =req.body;
     
           

    try{
        
        if(!isValidPhoneNumber(student_phoneno)){
            return res.status(400).json({message:'Invalid phone number format'})
           } 
        const hasUserWithUsername = await db.users.count({ where: {user_name}})
      
        if(hasUserWithUsername > 0){
            
            res.status(400).json({message:'Already existing user'})
            return
        }
       if(!password )
        {
            return res.status(400).json({message: 'Password is missing'});
        }
        
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            try{ 
                
                const user = await db.users.create(
                    {
                     user_id : user_id,
                     role: userRole.STUDENT, 
                     user_name:user_name, 
                     password:hashedPassword});
                
                     console.log("user created");

                    
                
                
                const student = await db.student.create(
                        {
                        student_id: student_id,
                        student_name:student_name,
                        student_course:student_course,
                        student_phoneno: student_phoneno,
                        user_id: user.user_id,
                        school_id: db.school.school_id,
                        
                    });
                    res.status(200).json({message: 'User created successfully.',
                        user:user,
                        student:student
                    });
                
            }catch(error){
                console.log("Error creating user or student",error.message);
            }  
        }
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError')
            {res.status(400).send("Email should be unique.Try another email id");
             } else if (error.name === 'SequelizeValidationError'){
           res.status(400).send("Enter an id in the email format");
             }
        res.status(500).json({message: 'Error creating user',error:error.message})
    }
};


//for signup of company
const signupCompany= async(req,res) => {
    const {user_id,
        user_name,
        password,
        company_id, 
        company_name,
        company_address,
        company_location,
        company_logo,
        status} =req.body;


    try{
       
        const hasUserWithUsername = await db.users.count({ where: {user_name}})
      
        if(hasUserWithUsername > 0){
            
            res.status(400).json({message:'Already existing user'})
            return
        }
       if(!password )
        {
            return res.status(400).json({message: 'Password is missing'});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);



            const user = await db.users.create(
                {user_id : user_id, 
                role: userRole.COMPANY, 
                user_name:user_name, 
                password:hashedPassword})
            const company = await db.company.create(
                {company_id:company_id,
                company_name:company_name,
                company_address: company_address,
                company_location:company_location,
                company_logo:company_logo,
                status:status,
                user_id: user.user_id
            })
            res.status(200).json({message: 'User created successfully.',
                user:user,
                company:company,
               
            });
        }
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError')
            {res.status(400).send("Email should be unique.Try another email id");
             } else if (error.name === 'SequelizeValidationError'){
           res.status(400).send("Enter an id in the email format");
             }
        res.status(500).json({message: 'Error creating user',error:error.message})
    }

}
module.exports = {signupSchool,signupStudent,signupCompany};


/* 
const express = require('express');
const router = express.Router();
const upload = require('./path/to/your/multer/config'); // Replace with the correct path to your multer config
const YourModel = require('./path/to/your/model'); // Replace with the correct path to your Sequelize model

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // File is saved to 'uploads/' folder
    const imageUrl = `/uploads/${req.file.filename}`;

    // Save image URL to database
    const record = await YourModel.create({ imageUrl });

    res.status(201).json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
      record: record
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


*/