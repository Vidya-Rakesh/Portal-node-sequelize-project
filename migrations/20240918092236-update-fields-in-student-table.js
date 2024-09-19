/* 'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} 
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('student', 'student_name'),
      queryInterface.addColumn('student', 'firstName', {
        type: DataTypes.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('student', 'lastName', {
        type: DataTypes.STRING,
        allowNull: false,
      })
         ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('student', 'student_name', {
        type: DataTypes.STRING,
        allowNull: false,
      }),
      queryInterface.removeColumn('student', 'firstName'),
      queryInterface.removeColumn('student', 'lastName')
      
    ]);
  },
  
}; */

'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      // Use a single queryInterface method call to add new columns
      await queryInterface.removeColumn('student', 'student_name');
      await queryInterface.addColumn('student', 'firstName', {
        type: DataTypes.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('student', 'lastName', {
        type: DataTypes.STRING,
        allowNull: false,
      });
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      // Revert the changes made in the up method
      await queryInterface.addColumn('student', 'student_name', {
        type: DataTypes.STRING,
        allowNull: false,
      });
      await queryInterface.removeColumn('student', 'firstName');
      await queryInterface.removeColumn('student', 'lastName');
    } catch (error) {
      console.error('Error during rollback:', error);
      throw error;
    }
  },
};
