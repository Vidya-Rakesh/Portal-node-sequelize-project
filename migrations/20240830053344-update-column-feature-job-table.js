'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('job','contact_email',{
      type:DataTypes.STRING,
      allowNull:false,
      unique:false
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.changeColumn('job','contact_email',{
    
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
   });
  }
};
