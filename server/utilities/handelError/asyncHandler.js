const AppError = require("./appErrorClass");

const asyncHandler=(fn)=>
{
    return (req,res,next)=>
    {
        fn(req,res,next).catch(err=>
            {
                next(new AppError(err, 400))
            })  
    }
};

module.exports=asyncHandler