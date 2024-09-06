//'use strict';
/* const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}); */
const dbConfig = require('../config/config.js');
const {Sequelize, DataTypes} =require('sequelize');
const poolConfig = dbConfig.pool  || {max:5,min:0, acquire:30000,idle:10000}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      pool: poolConfig,
      logging: false//process.env.NODE_ENV == "dev"
  }
)
sequelize.authenticate()
    .then(() => {
        console.log('connected with db..')
    })
    .catch(err => {

        console.log('error' + err)

    })




const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./usersmodel')(sequelize,DataTypes)
db.school = require('./schoolmodel')(sequelize,DataTypes)
db.student = require('./studentmodel')(sequelize,DataTypes)
db.company = require('./companymodel')(sequelize,DataTypes)
db.job = require('./jobmodel')(sequelize,DataTypes)
db.usertoken = require('./usertokenmodel.js')(sequelize,DataTypes)

db.user.hasMany(db.school, {
  foreignKey: 'user_id',
  sourceKey: 'user_id',
});
db.school.belongsTo(db.user, {
  foreignKey: 'user_id',

});

 db.user.hasMany(db.student, {
  foreignKey: 'user_id',
  sourceKey: 'user_id',
});
db.student.belongsTo(db.user, {
  foreignKey: 'user_id',

});

db.user.hasMany(db.company, {
  foreignKey: 'user_id',
  sourceKey: 'user_id',
});
db.company.belongsTo(db.user, {
  foreignKey: 'user_id',

}); 


db.school.hasMany(db.student,{
  foreignKey:'school_id',
  sourceKey : 'school_id',
});
db.student.belongsTo(db.school,{
  foreignKey: 'school_id',
});


 db.company.hasMany(db.job,{
  foreignKey:'company_id',
  sourceKey:'company_id',
});
db.job.belongsTo(db.company,{
  foreignKey:'company_id',
});


db.company.hasMany(db.job,{
  foreignKey:'company_name',
  sourcekey:'company_name',
});
db.job.belongsTo(db.company,{
  foreignKey:'company_name', 
});

db.user.hasMany(db.usertoken, {
  foreignKey: 'user_id',
  sourceKey: 'user_id',
});
db.usertoken.belongsTo(db.user, {
  foreignKey: 'user_id',

});


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database is synced')
    }) 

module.exports = db;



