  //a model for students using the portal.


module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        student_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
          },
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'users',
                key:"user_id"
               },
        },
        school_id:{
            type: DataTypes.INTEGER,
             references:{
              model: 'school',
              key:"school_id"
             },
           
        },
        student_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        student_course:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        student_phoneno:{
            type: DataTypes.STRING,
            allowNull: false,
        },
           
        
     }, {
        paranoid: true,
        tableName: 'Student', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
      });
  
    return Student;
  }; 
