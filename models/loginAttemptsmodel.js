// login_attempts.model.js
module.exports = (sequelize, DataTypes) => {
    const LoginAttempts = sequelize.define(' LoginAttempts', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      failed_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      lock_until: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },{
        paranoid: true,
        tableName: 'loginattempts', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
      }
);
  
    return LoginAttempts;
  };
  