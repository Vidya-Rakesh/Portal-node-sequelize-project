 //a model for schools using the portal.


 module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define('School', {
        school_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
          },
        user_id:{
            type: DataTypes.INTEGER,
             references:{
              model: "users",
              key:"user_id"
             },
            
        },
        school_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        school_address:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        school_location:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        school_logo:{
            type:DataTypes.BLOB('long'),
            allowNull:false,
        },
      
      
     }, {
        paranoid: true,
        tableName: 'School', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
      });
  
    return School;
  }; 
 