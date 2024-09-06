// for students to apply for jobs posted by companies.


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

//for students to apply for the jobs
const jobRequest= async(req,res) => {
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
            const {job_id} = req.body;
            console.log({user_id});
            console.log({job_id});
            const currentjob =await db.job.findOne({
                where:{job_id:job_id},
                attributes:['company_id','job_status']
            })
            if(!job_id){return res.send(200).json({message:"No such job",error:error.message})}
            const company_id = currentjob.company_id;
           const job_status =currentjob.job_status;
           
            console.log({company_id});
            console.log({job_status});
            const studentid = await db.student.findOne({
                where:{user_id:user_id,},
                attributes:['student_id']
            })
            const student_id = studentid.student_id;
            console.log({student_id});
           const jobEntry = await db.jobRequest.findOne({
             where :{student_id:student_id,job_id:job_id}
            })
            console.log({jobEntry});
        if(jobEntry){
            return res.status(400).json({message:"You have already applied for this job"});
            }


           
            
           if(job_status === 'active'){
                const jobRequest = await  db.jobRequest.create({
                    
                    job_id : job_id,
                    company_id:company_id,
                    user_id: user_id,
                    student_id: student_id,
                    status:'pending'


                })      
            }
            else{
                return res.status(200).json({message: 'No active jobs '})
            }
           
           
           return res.status(200).json({message: 'Job request by the student is posted.',
                jobRequest:jobRequest,
                });

        }
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError')
            {
                return res.status(400).send("Email should be unique.Try another email id");
             } else if (error.name === 'SequelizeValidationError'){
           return res.status(400).send("Enter an id in the email format");
             }
       return res.status(500).json({message: 'Error in applying for jobs',error:error.message})
    }

}
module.exports = {jobRequest};