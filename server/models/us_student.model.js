const {DataTypes, Model} = require("sequelize");
const {sequelize}= require("../db_connection/connection");


class Us_student extends Model {

}

Us_student.init({

  id:{
    type:DataTypes.STRING, 
    allowNull:false,
    primaryKey:true,
    autoIncrement:false,

  },
  basic_science_coursework:{
   type:DataTypes.BOOLEAN,
   allowNull:false,
  },
  basic_science_foundation:{
  type: DataTypes.ENUM('weak ','Fair ','good','Expert'),

  },
  usmle_date:{
    type:DataTypes.DATE
  },
  uworld_subscription: {
    type: DataTypes.BOOLEAN, 
  },
  user_id: {
    type: DataTypes.STRING,
    
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
  modelName:'us_student'
});


(async () => {
  try {
    await Us_student.sync();
    console.log('us_student table created successfully.');
  } catch (error) {
    console.error('Error creating us_students table:', error);
  }
})();


module.exports=Us_student