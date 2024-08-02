/* eslint-disable no-unused-vars */
require('dotenv').config();

const env = process.env.node_env

const globalError=(err,req,res,next)=>
{

    if (err) 
    {
        if(env=="development")
        {
        err.statusCode=err.statusCode || 500;
        res.status(err.statusCode).json({ message:err.message, status:err.statusCode, stack:err.stack});
        }else
        {
        err.statusCode=err.statusCode || 500;
        res.status(err.statusCode).json({message:err.message,state:err.statusCode});

        }
    }
}

module.exports=globalError;