const {DataTypes, Model} = require("sequelize");
const {sequelize}= require("../db_connection/connection");


class Video extends Model {

}

Video.init({

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
  
    
      video:{
        type: DataTypes.STRING,
      },
      video_id: {

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
  modelName:'video'
});


(async () => {
  try {
    await Video.sync();
    console.log('video table created successfully.');
  } catch (error) {
    console.error('Error creating videos table:', error);
  }
})();


module.exports=Video