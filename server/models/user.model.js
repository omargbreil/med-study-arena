const {DataTypes, Model} = require("sequelize");
const {sequelize}= require("../db_connection/connection");





class User extends Model {


  getEmail(){

      return this.email

  };
  getPhone(){

    return this.phone
  };
  
}

 User.init({

    id:{
        type:DataTypes.STRING, 
        allowNull:false,
        primaryKey:true,
        autoIncrement:false
      },
      name:{
       type:DataTypes.STRING,
       allowNull:false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      role: {
        type: DataTypes.ENUM('admin','customer','tutor'),
        defaultValue:'customer'
      },
      phone:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      qualification:{
        type:DataTypes.ENUM("us_student","int_student","int_graduate")

      },
      
      otp:{
        type:DataTypes.INTEGER,
         defaultValue:0
       
      },
      country: {
        type:DataTypes.STRING,
      },
      
      verified:{
       type:DataTypes.BOOLEAN,
       defaultValue:false,
      },
      answered:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
      },
      
      pay:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
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
  modelName:'user'
});


(async () => {
  try {
    await User.sync();
    console.log('users table created successfully.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
})();


module.exports=User