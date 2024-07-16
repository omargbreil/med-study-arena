'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    /* -------------------------------------------------------------------------- */
    /*                                    USER                                    */
    /* -------------------------------------------------------------------------- */



    await queryInterface.createTable('users', { 
      id:{
        type:Sequelize.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false

      },
      name:{
       type:Sequelize.STRING,
       allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      role: {
        type: Sequelize.ENUM('admin','customer','tutor'),
      },
      phone:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      
      otp:{
        type:Sequelize.INTEGER,
         defaultValue:0
       
      },
      country: {
        type:Sequelize.STRING
      },
      qualification:{

        type:Sequelize.ENUM("us_student","int_student","int_graduate")

      },
      
      verified:{
       type:Sequelize.BOOLEAN,
       defaultValue:false,
      },
      answered:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      

      pay:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,

      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    /* -------------------------------------------------------------------------- */
    /*                                   COURSE                                   */
    /* -------------------------------------------------------------------------- */




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
      image:{

        type:Sequelize.STRING
       },
       image_id:{
  
        type:Sequelize.STRING
       },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
      /* -------------------------------------------------------------------------- */
      /*                                    VIDEO                                   */
      /* -------------------------------------------------------------------------- */

    await queryInterface.createTable('videos', {
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
      video: {
        type: Sequelize.TEXT, 
      },
      videos_id: {
        type: Sequelize.TEXT, 
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });


    /* ---------------------------------- track --------------------------------- */

    await queryInterface.createTable('tracks', {
   
      id:{
        type:Sequelize.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false,

      },
      
      text:{
        type:Sequelize.TEXT
      },
     
     image:{

      type:Sequelize.STRING
     },
     image_id:{

      type:Sequelize.STRING
     },
     video:{
        type: Sequelize.STRING,
      },
      video_id: {

        type: Sequelize.STRING,
      },
      pdf:{
        type: Sequelize.STRING,
      },
      pdf_id: {

        type: Sequelize.STRING,
      },
      course: {
        type: Sequelize.STRING,
        references: {
            model: 'courses',
            key: "id"
        },      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });




  },

  async down (queryInterface) {
    
      await queryInterface.dropTable('users');
      await queryInterface.dropTable('courses');
      await queryInterface.dropTable('videos');
      await queryInterface.dropTable('tracks');


     
  }
};
  