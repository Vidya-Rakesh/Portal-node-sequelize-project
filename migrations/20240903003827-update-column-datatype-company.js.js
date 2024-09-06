'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize)  {
    await queryInterface.changeColumn('company','company_logo',{
      type:DataTypes.STRING,
      allowNull:true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('company','company_logo',{
      type:DataTypes.BLOB('long'),
      allowNull:false,
  });
},
}

