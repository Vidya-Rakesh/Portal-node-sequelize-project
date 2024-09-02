//a model for details of job in the portal.



module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        job_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
          },
       
        company_id:{
            type: DataTypes.INTEGER,
             references:{
              model: 'company',
              key:'company_id'
             },
          
        },
       
        job_title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_description:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        job_location:{
            type: DataTypes.STRING,
            allowNull: false,
        },
       
      employement_type: {
        type:DataTypes.STRING,
        allowNull:false,

      },
      salary_range:{
        type:DataTypes.DECIMAL,
        allowNull:false,

      },
      experience_level:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      application_deadline:{
        type:DataTypes.DATE,
        allowNull:false,
      },
      job_status:{
        type:DataTypes.ENUM('active','closed'),
        allowNull: true,
        defaultValue: 'active'
      },
      job_industry:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      job_skills:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      education_required:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      contact_email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: false,
        validate:{
        isEmail: true,
        notEmpty: true
       } 
      },
      no_of_openings:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      link_to_apply:{
        type: DataTypes.STRING(2083),
        allowNull: false,
        validate: {
            isUrl: true 
        }

      }

      
     }, {
        paranoid: true,
        tableName: 'Job', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
      });
  
    return Job;
  };
    