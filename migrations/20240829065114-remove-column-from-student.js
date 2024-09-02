'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     //Remove column school_name from student table
     
      await queryInterface.removeColumn('student', 
        'student_schoolName');
     
  },

  async down (queryInterface, Sequelize) {
   //add the column back if you need
     await queryInterface.addColumn('student','student_schoolName',{
      type:Sequelize.STRING,
      allowNull:true,
     });
     
  }
};
