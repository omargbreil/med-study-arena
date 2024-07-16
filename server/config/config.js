require('dotenv').config();

const cenv=process.env.node_env ||"development";


module.exports={
  "development": {
    "username":process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_name,
    "host": process.env.db_host,
    "dialect":process.env.dialect,
    
  },
  "test": {
    "username":process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_name,
    "host": process.env.db_host,
    "dialect":process.env.dialect
  },
  "production": {
    "username":process.env.MYSQL_ADDON_USER,
    "password": process.env.MYSQL_ADDON_PASSWORD,
    "database": process.env.MYSQL_ADDON_DB,
    "host": process.env.MYSQL_ADDON_HOST,
    "dialect":process.env.dialect,
    "port":process.env.MYSQL_ADDON_PORT
  }
}[cenv];

module.exports.cenv=cenv