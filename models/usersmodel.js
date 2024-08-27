
  //a model for all type of users for the portal.


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
      },
      role:{
        type:DataTypes.INTEGER,
        autoIncrement:false,
        allowNull:false,
      },
      user_name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
        isEmail: true,
        notEmpty: true
       } 
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false,
        
      }
      
     }, {
        paranoid: true,
        tableName: 'users', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
      });
  
    return User;
  };