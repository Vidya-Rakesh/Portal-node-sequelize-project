//handles the signup of any user


const bcrypt = require('bcrypt');
const {Sequelize,DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
const { isValidPhoneNumber } = require('../config/utils/Validation');
const { generateAccessToken } = require('../config/utils/auth');
const upload = require('../config/utils/upload'); 


const db={}

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
   
    const {user_id,
           password,
           school_id,
           school_name,
           school_address,
           school_location,
           } =req.body;

   const user_name=req.body.user_name.toLowerCase();
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
           
            const tokens = await generateAccessToken(user);
          
                
           
           const school = await db.school.create(
                {user_id : user.user_id,
                school_id:school_id,
                school_name:school_name,
                school_address:school_address,
                school_location: school_location,
                school_logo:school_logo})

            res.status(200).json({message: 'School User created successfully.',
                user:user,
                school:school,
                accessToken:tokens.accessToken,
                refreshToken:tokens.refreshToken
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
//*********
//for signup of student
const signupStudent= async(req,res) => {

   
    const {user_id,
           password,
          school_id,
           student_id,
           student_name,
           student_course,
           student_phoneno,
           } =req.body;
     
          const user_name=req.body.user_name.toLowerCase();    

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

                     
                const tokens = await generateAccessToken(user);
                     
                
                const student = await db.student.create(
                        {
                        student_id: student_id,
                        student_name:student_name,
                        student_course:student_course,
                        student_phoneno: student_phoneno,
                        user_id: user.user_id,
                        school_id: school_id,
                        
                    });
                    res.status(200).json({message: 'User created successfully.',
                        user:user,
                        student:student,
                        accessToken:tokens.accessToken,
                        refreshToken:tokens.refreshToken,
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
        password,
        company_id, 
        company_name,
        company_address,
        company_location,
        company_logo,
        status} =req.body;

       const user_name=req.body.user_name.toLowerCase();
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
    const company_logo = `/uploads/${req.file.filename}`
    
    const user = await db.users.create(
    {user_id : user_id, 
    role: userRole.COMPANY, 
    user_name:user_name, 
    password:hashedPassword})

    const tokens = await generateAccessToken(user);

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
    accessToken:tokens.accessToken,
    refreshToken:tokens.refreshToken
     });
}catch(error){
    if(error.name === 'SequelizeDatabaseError'){
        return res.status(400).json({message:`Only acceptable values for status is 'active','inactive'`,error:error.message});
    }
    console.log("Error creating user or company",error.message);
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
module.exports = {signupSchool,signupStudent,signupCompany};





