const {DataTypes, Model} = require("sequelize");
const {sequelize}= require("../db_connection/connection");


class Int_graduate extends Model {

}

Int_graduate.init({

  id:{
    type:DataTypes.STRING, 
    allowNull:false,
    primaryKey:true,
    autoIncrement:false,

  },
  Year_of_graduation:{
  type:DataTypes.DATE

  },
  study_medicine_well:{

    type:DataTypes.ENUM("yes","no","not_really")
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
  modelName:'int_graduate'
});


(async () => {
  try {
    await Int_graduate.sync();
    console.log('int_graduate table created successfully.');
  } catch (error) {
    console.error('Error creating int_graduates table:', error);
  }
})();


module.exports=Int_graduate