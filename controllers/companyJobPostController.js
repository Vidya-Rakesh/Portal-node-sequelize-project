const db = require ('../models/usersmodel');
const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');



db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.company = require('../models/companymodel')(sequelize,DataTypes);
db.job = require('../models/jobmodel')(sequelize,DataTypes);


//for company to enter job details to the portal
const companyJobPost= async(req,res) => {
    const userAgent = req.headers['user-agent'];
    console.log("user agent",userAgent);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing.' });
    }
    
    const {
        job_id,
        job_title,
        job_description, 
        job_location,
        employement_type,
        salary_range,
        experience_level,
        application_deadline,
        job_status,
        job_industry,
        job_skills,
        education_required,
        contact_email,
        no_of_openings,
        link_to_apply
    } =req.body;


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
            const company = await db.company.findOne({
                where :{user_id},
                attributes:['company_id']
            })
            const company_id= company? company.company_id: null;
            console.log({user_id});
            console.log({company_id});
            const job= await db.job.create(
                {   
                    job_id:job_id,
                    company_id:company_id,
                    job_title:job_title,
                    job_description: job_description, 
                    job_location:job_location,
                    employement_type:employement_type,
                    salary_range:salary_range,
                    experience_level:experience_level,
                    application_deadline:application_deadline,
                    job_status:job_status,
                    job_industry:job_industry,
                    job_skills:job_skills,
                    education_required:education_required,
                    contact_email:contact_email,
                    no_of_openings:no_of_openings,
                    link_to_apply:link_to_apply

                }
            )


           
           return res.status(200).json({message: 'Job posted successfully.',
                job:job,
                
               
            });
        }
    }catch(error){
        if(error.name === 'SequelizeUniqueConstraintError')
            {
                return res.status(400).send("Email should be unique.Try another email id");
             } else if (error.name === 'SequelizeValidationError'){
           return res.status(400).send("Enter an id in the email format");
             }
       return res.status(500).json({message: 'Error creating user',error:error.message})
    }

}
module.exports = {companyJobPost};