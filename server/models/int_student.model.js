const {DataTypes, Model} = require("sequelize");
const {sequelize}= require("../db_connection/connection");


class Int_student extends Model {

}

Int_student.init({

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
  type: DataTypes.ENUM('weak ','fair ','good','expert'),

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
  modelName:'int_student'
});


(async () => {
  try {
    await Int_student.sync();
    console.log('int_student table created successfully.');
  } catch (error) {
    console.error('Error creating Int_student table:', error);
  }
})();


module.exports=Int_student