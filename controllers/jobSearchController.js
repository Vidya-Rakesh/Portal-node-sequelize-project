// jobController.js
const db = require ('../models/usersmodel');
const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
const { Op } = require('sequelize');



db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.company = require('../models/companymodel')(sequelize,DataTypes);
db.job = require('../models/jobmodel')(sequelize,DataTypes);




const searchJobs = async (req, res) => {
    try {
      const { job_title, job_location,employement_type,job_industry,job_skills,salaryMin,salaryMax,company_name} = req.query;
      const query = { where: {} };
  
      // Add filters to the query dynamically
      /* if (job_title) {
        query.where.job_title = { [Op.like]: `%${job_title}%` }; // Search by job title
      } */
      if (job_title) {
        query.where = {
          ...query.where,  // Keep existing conditions
          job_title: { [Op.like]: `%${job_title}%` }  // Add the job title condition
        };
      }
      
      if (job_location) {
        query.where.job_location = { [Op.like]: `%${job_location}%` };
      }
      if (employement_type) {
        query.where.employement_type = employement_type;
      }
      if (salaryMin || salaryMax) {
        query.where.salary = {
          [Op.between]: [salaryMin || 0, salaryMax || Number.MAX_SAFE_INTEGER],
        };
    }
    if(job_industry){
        query.where.job_industry=job_industry;
    }
    if(job_skills){
        query.where.job_skills=job_skills;
    }
      
      
      // Join with company and search by company name if needed
      if (company_name) {
        query.include = [
          {
            model: db.company,
            as:'company',
            where: { name: { [Op.like]: `%${company_name}%` } },
          },
        ];
const compy = db.company
        console.log({compy}); // Check if the company model is loaded correctly
        console.log(db.job); // Check if the job model is loaded correctly

      }
  
      const jobs = await db.job.findAll(query);
      if(jobs.length > 0){
        console.log("there is job list");
        //console.log({jobs})
       return res.status(200).json({ jobs });}
      else{
      return res.status(400).json({message:'No jobs with all the specified criteria'})
      }
      
    } catch (error) {
      res.status(500).json({message: 'Error fetching jobs' ,error:error.message});
    }
  };
  

  module.exports={searchJobs};