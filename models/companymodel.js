//a model for companies using the portal.



module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        company_id:{
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
        company_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_address:{
            type: DataTypes.STRING,
            allowNull: false,

        },
        company_location:{
            type: DataTypes.STRING,
            allowNull: false,
        },
       
      company_logo: {
        type:DataTypes.BLOB('long'),
        allowNull:false,

      },
      status:{
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: true,
        defaultValue: 'inactive'

      }
      
     }, {
        paranoid: true,
        tableName: 'Company', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
      });
  
    return Company;
  };
   