//a model for companies using the portal.



module.exports = (sequelize, DataTypes) => {
    const jobRequest = sequelize.define('JobRequest', {
        jobRequest_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
          },
        user_id:{
            type: DataTypes.INTEGER,
             references:{
              model: 'users',
              key:'user_id'
             },
          
        },
        company_id:{
            type: DataTypes.INTEGER,
             references:{
              model: 'company',
              key:'company_id'
             },
          
        },
        student_id:{
            type: DataTypes.INTEGER,
             references:{
              model: 'student',
              key:'student_id'
             },
          
        },
        job_id:{
            type: DataTypes.INTEGER,
             references:{
              model: 'job',
              key:'job_id'
             },
          
        },
       
      
      status:{
        type: DataTypes.ENUM('pending','approved','rejected'),
        allowNull: true,
        defaultValue: 'pending'

      }
      
     }, {
        paranoid: true,
        tableName: 'JobRequest', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
      });
  
    return jobRequest;
  };
   