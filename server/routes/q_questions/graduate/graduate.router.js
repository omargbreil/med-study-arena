const Int_graduate = require("../../../models/int_graduate.model");
const User = require("../../../models/user.model");
const { authMiddleware, accepted } = require("../../../utilities/authMiddleware/authMiddleware");
const generateId = require("../../../utilities/generateId");
const AppError = require("../../../utilities/handelError/appErrorClass");
const asyncHandler = require("../../../utilities/handelError/asyncHandler");




const gratuateRouter = require("express").Router();

/* -------------------------------------------------------------------------- */
/*                                   answer                                 */
/* -------------------------------------------------------------------------- */

gratuateRouter.post("/answer",authMiddleware(accepted.all),asyncHandler(async(req,res,next)=>{
    let answer = Int_graduate.build(req.body);

   try {

    answer.id=generateId();
    answer.user_id=req.user.id;
    
    await answer.save();
    let user = await User.findOne({where:{id:req.user.id}});
    user.answered=true;
    await user.save();

    res.status(200).json({message:"done",answer});
    
   } catch (error) {
    
    next(new AppError("catch error",500))
   }




}))

module.exports=gratuateRouter;
