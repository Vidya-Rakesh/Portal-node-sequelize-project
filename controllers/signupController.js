
const db = require ('../models/usersmodel');
const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
const { isValidPhoneNumber } = require('../config/utils/Validation');


db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.school = require('../models/schoolmodel')(sequelize,DataTypes);
db.student=require('../models/studentmodel')(sequelize,DataTypes);
db.company = require('../models/companymodel')(sequelize,DataTypes);



//for signup of school
const signupSchool= async(req,res) => {
    const {user_id,
           role,
           user_name,
           password,
           school_id,
           school_name,
           school_address,
           school_location,
           school_logo} =req.body;
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
            const user = await db.users.create(
                {user_id : user_id, 
                role: role, 
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

//for signup of student
const signupStudent= async(req,res) => {
    const {user_id,
           role,
           user_name,
           password,
           school_id,
           student_id,
           student_name,
           student_course,
           student_phoneno,
           student_schoolName} =req.body;
            
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
                    {user_id : user_id,
                     role: role, 
                     user_name:user_name, 
                     password:hashedPassword})
                
                     console.log("user created");

                     const school= await db.school.findOne({where: {school_name:student_schoolName}});
                     
               
                    if(!school){const student = await db.student.create(
                        {
                        student_id: student_id,
                        student_name:student_name,
                        student_course:student_course,
                        student_phoneno: student_phoneno,
                        student_schoolName:student_schoolName,
                        user_id: user.user_id,
                        school_id:school_id,
                        
                    })
                    //console.log("no school like this in school table");
                    res.status(200).json({message: 'User created successfully.',
                        user:user,
                        student:student
                    });
                }
                
                if(school){
                const student = await db.student.create(
                        {
                        student_id: student_id,
                        student_name:student_name,
                        student_course:student_course,
                        student_phoneno: student_phoneno,
                        student_schoolName:student_schoolName,
                        user_id: user.user_id,
                        school_id: school.school_id,
                        
                    })
                    res.status(200).json({message: 'User created successfully.',
                        user:user,
                        student:student
                    });
                } 
                
                
            }
           catch(error){
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

}

//for signup of company
const signupCompany= async(req,res) => {
    const {user_id,
        role,
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
                role: role, 
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