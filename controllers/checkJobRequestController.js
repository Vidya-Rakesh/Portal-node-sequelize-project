//allows the companies to check the job requests by students and also update the status of a job requested by student.

const db = require ('../models/usersmodel');
const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
//const { status } = require('init');



db.users = require('../models/usersmodel')(sequelize,DataTypes);
db.company = require('../models/companymodel')(sequelize,DataTypes);
db.job = require('../models/jobmodel')(sequelize,DataTypes);
db.student= require('../models/studentmodel')(sequelize,DataTypes);
db.school = require('../models/schoolmodel')(sequelize,DataTypes);
db.jobRequest=require('../models/jobRequestmodel')(sequelize,DataTypes);


const checkJobRquest= async(req,res) => {
    const userAgent = req.headers['user-agent'];
    console.log("user agent",userAgent);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing.' });
    }
    
    

    try{
        const decodedCredentials = Buffer.from(authHeader, 'base64').toString('utf-8');
        const [user_name, password, ] = decodedCredentials.split(' ');
        console.log({user_name});
        console.log({password});
        const hasUserWithUsername = await db.users.count({ where: {user_name}})
      
        if(!hasUserWithUsername){
            
            res.status(400).json({message:'You donot have an account in the portal. Please signup!!!'})
            return
        }
       if(!password )
        {
            return res.status(400).json({message: 'Password is missing'});
        }
        else{
            
            const user = await db.users.findOne({
                where:{user_name},
                attributes:['user_id']
            });
            const user_id = user? user.user_id : null;
            console.log({user_id});
            const currentCompany = await db.company.findOne({
                where:{user_id:user_id},
                attributes: ['company_id']
            })

            const company_id = currentCompany.company_id;
            console.log({company_id});

            

            const {job_id,student_id,status} =req.body;
            console.log({job_id});

              //To view all the job requests

              if(job_id && !student_id && !status){

                const jobRequest = await db.jobRequest.findAll({
                    where:{
                    company_id:company_id,
                    job_id:job_id
                }} )
    
               // console.log({jobRequest});
                return res.status(200).json({
                    message: "Job requests by students displayed",
                    jobRequest:jobRequest ,
                });
              }

              
              //to update the status of a student applied for job
              if(job_id && student_id && status){
                const student = await db.student.findOne({
                    where:{student_id}
                })
                if(!student){
                    return res.status(400).json({message:'Student not found',error:error.message});

                }
                try{ const updated = await db.jobRequest.update(
                            {status:status},
                            {where:{student_id:student_id,job_id:job_id}}
                        )

                       
                if(updated){
                    return res.status(200).json({message:`Status of student's job request is updated by the company` })
                }else{
                    return res.send(400).json({message:'Failed to update status of job request',error:error.message})
                } 
                    }catch(error){
                       if(error.name=== 'SequelizeDatabaseError')
                        return res.status(400).json({message:`Only acceptable values for status is 'pending','approved','rejected'`,error:error.message});
                    }
               


              }
           
        return res.status(400).json({message:'Invalid job_id or student_id provided'})
            
        }
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError')
            {
                return res.status(400).send("Email should be unique.Try another email id");
             } else if (error.name === 'SequelizeValidationError'){
           return res.status(400).send("Enter an id in the email format");
             }
       return res.status(500).json({message: 'Error in viewing job request',error:error.message})
    }

}
module.exports = {checkJobRquest};