'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('courses', {
        id:{
          type:Sequelize.STRING, 
          allowNull:false,
          primaryKey:true,
          autoIncrement:false,
  
        },
        name:{
         type:Sequelize.STRING,
         allowNull:false,
        },
        slug:{
          type:Sequelize.STRING,
  
        },
        description:{
          type:Sequelize.TEXT
        },
        discount:{
          type:Sequelize.INTEGER,
        },
        price:{
          type:Sequelize.INTEGER,
          allowNull:false
        },
        total_price:{
          type:Sequelize.INTEGER,
          allowNull:false
        },
        vedios: {
          type: Sequelize.TEXT, // Use TEXT data type for storing serialized array
        },
        vedios_id: {
          type: Sequelize.TEXT, // Use TEXT data type for storing serialized array
        },
      });
  
  },

  async down (queryInterface) {
 
      await queryInterface.dropTable('courses');
     
  }
};
