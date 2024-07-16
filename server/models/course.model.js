const {DataTypes, Model} = require("sequelize");
const {sequelize}= require("../db_connection/connection");


  


class Course extends Model {
  
}

 Course.init({

    id:{
        type:DataTypes.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false,

      },
      name:{
       type:DataTypes.STRING,
       allowNull:false,
      },
      slug:{
        type:DataTypes.STRING,

      },
      description:{
        type:DataTypes.TEXT
      },
      discount:{
        type:DataTypes.INTEGER,
      },
      price:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      total_price:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
     image:{

      type:DataTypes.STRING
     },
     image_id:{

      type:DataTypes.STRING
     },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
},{
  sequelize,
  modelName:'course'
});


(async () => {
  try {
    await Course.sync();
    console.log('courses table created successfully.');
  } catch (error) {
    console.error('Error creating courses table:', error);
  }
})();


module.exports=Course