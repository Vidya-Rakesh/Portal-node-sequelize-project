const db = require ('../models/usersmodel');
const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');



db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.company = require('../models/companymodel')(sequelize,DataTypes);
db.job = require('../models/jobmodel')(sequelize,DataTypes);


//for company to delete the job details
const jobDelete= async(req,res) => {
    const userAgent = req.headers['user-agent'];
    console.log("user agent",userAgent);
    const authHeader = req.headers.authorization;
    const job_id= req.body.job_id;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing.' });
    }
    
    

    try{
        const decodedCredentials = Buffer.from(authHeader, 'base64').toString('utf-8');
        const [user_name, password, ] = decodedCredentials.split(' ');
        console.log({user_name});
     
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
            const company = await db.company.findOne({
                where :{user_id},
                attributes:['company_id']
            })
            const company_id= company? company.company_id: null;
            if(!company_id){
                return res.status(400).json({message:'Company not found'});
            }
            console.log({user_id});
            console.log({company_id});
            console.log({job_id});
           if(!job_id){
            return res.status(400).json({message: 'Job ID is not given'});
           }
            const job = await db.job.destroy({
                where:{
                    company_id:company_id,
                    job_id: job_id

                },force:true
               })

           if(!job){
            return res.status(404).json({message:'Job not found or already deleted'});
           }
           return res.status(200).json({message: 'Job selected by company is deleted.',
                
                });

        }
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError')
            {
                return res.status(400).send("Email should be unique.Try another email id");
             } else if (error.name === 'SequelizeValidationError'){
           return res.status(400).send("Enter an id in the email format");
             }
       return res.status(500).json({message: 'Error displaying jobs',error:error.message})
    }

}
module.exports = {jobDelete};