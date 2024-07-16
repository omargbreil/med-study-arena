const {DataTypes, Model} = require("sequelize");
const {sequelize}= require("../db_connection/connection");


  


class Track extends Model {
  
}

Track.init({

    id:{
        type:DataTypes.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false,

      },
      
      text:{
        type:DataTypes.TEXT
      },
     
     image:{

      type:DataTypes.STRING
     },
     image_id:{

      type:DataTypes.STRING
     },
     video:{
        type: DataTypes.STRING,
      },
      video_id: {

        type: DataTypes.STRING,
      },
      pdf:{
        type: DataTypes.STRING,
      },
      pdf_id: {

        type: DataTypes.STRING,
      },
      course: {
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
  modelName:'track'
});


(async () => {
  try {
    await Track.sync();
    console.log('track table created successfully.');
  } catch (error) {
    console.error('Error creating tracks table:', error);
  }
})();


module.exports=Track