const jwt=require("jsonwebtoken");
const asyncHandler = require("../handelError/asyncHandler");
const AppError = require("../handelError/appErrorClass");
const User = require("../../models/user.model");



 exports.accepted =
{
    admin:"admin",
    customer:"customer",
    all:["admin","customer"]
    
}
exports.authMiddleware=(roles)=>
{
   return asyncHandler(async(req,res,next)=>

 
    {
    let token = req.headers.token;
    if (!token) return next(new AppError("token not provided"));
    let decoded = jwt.verify(token ,process.env.token_key);
    let user = await User.findOne({where:{id:decoded.id}});

    if (!user)return next(new AppError("user not found" ,401));




    req.user=user.dataValues;



    
    if (!roles.includes(user.role)) 
    {
       return next(new AppError("not authorize" ,401))    
    }
   
    
    next()
    
    

})

    

}