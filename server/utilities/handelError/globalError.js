/* eslint-disable no-unused-vars */
require('dotenv').config();
const {cenv}= require("../../config/config")


const globalError=(err,req,res,next)=>
{
    console.log(cenv);

    if (err) 
    {
        if(cenv=="development")
        {
            console.log(cenv);
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