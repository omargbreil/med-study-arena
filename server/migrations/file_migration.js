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

  /* -------------------------------------------------------------------------- */
  /*                                    us_students                                 */
  /* -------------------------------------------------------------------------- */
    await queryInterface.createTable('us_students', {
      id:{
        type:Sequelize.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false,

      },
      basic_science_coursework:{
       type:Sequelize.BOOLEAN,
       allowNull:false,
      },
      basic_science_foundation:{
      type: Sequelize.ENUM('weak ','fair ','good','expert'),

      },
      usmle_date:{
        type:Sequelize.DATE
      },
      uworld_subscription: {
        type: Sequelize.BOOLEAN, 
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: "id"
        },
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

      /* -------------------------------------------------------------------------- */
      /*                                int_students                                */
      /* -------------------------------------------------------------------------- */
    });
    await queryInterface.createTable('int_students', {
      id:{
        type:Sequelize.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false,

      },
      basic_science_coursework:{
       type:Sequelize.BOOLEAN,
       allowNull:false,
      },
      basic_science_foundation:{
      type: Sequelize.ENUM('weak','fair','good','expert'),

      },
      usmle_date:{
        type:Sequelize.DATE
      },
      uworld_subscription: {
        type: Sequelize.BOOLEAN, 
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: "id"
        },
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
    /*                                int_graduates                                */
    /* -------------------------------------------------------------------------- */
    await queryInterface.createTable('int_graduates', {
      id:{
        type:Sequelize.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false,

      },
      Year_of_graduation:{
      type:Sequelize.DATE

      },
      study_medicine_well:{

        type:Sequelize.ENUM("yes","no","not_really")
      },
      basic_science_foundation:{
        type: Sequelize.ENUM('weak','fair','good','expert'),
  
        },
   
      usmle_date:{
        type:Sequelize.DATE
      },
      uworld_subscription: {
        type: Sequelize.BOOLEAN, 
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
            model: 'users',
            key: "id"
        },
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
      await queryInterface.dropTable('us_students');
      await queryInterface.dropTable('int_students');
      await queryInterface.dropTable('int_graduates');
      await queryInterface.dropTable('tracks');


     
  }
};
  