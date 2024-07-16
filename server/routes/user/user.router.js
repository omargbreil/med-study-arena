const  jwt  = require("jsonwebtoken");
const User =require("../../models/user.model");
const AppError = require("../../utilities/handelError/appErrorClass");
const asyncHandler = require("../../utilities/handelError/asyncHandler");
const validation = require("../../utilities/validation/validation");
const { signupSchema, changePasswordSchema,signinSchema } = require("./userValidation");
const bcrypt = require("bcryptjs");
const { authMiddleware, accepted } = require("../../utilities/authMiddleware/authMiddleware");
const generateId = require("../../utilities/generateId");
const { sendEmail } = require("../../utilities/sendEmail");



const userRouter=require("express").Router();

/* -------------------------------------------------------------------------- */
/*                                   SignUp                                  */
/* -------------------------------------------------------------------------- */

userRouter.post('/signup',validation(signupSchema),asyncHandler(async(req,res,next)=>{

    const user = User.build(req.body);
    
    let email = user.getEmail();

    const findUser = await User.findOne({where:{email}});

    if (findUser) {
        
        return next(new AppError('the email is already registered',400));
    }

    const hashed = bcrypt.hashSync(req.body.password, parseInt(process.env.salt));
    user.password= hashed;
    user.id=generateId();
    let token = jwt.sign({id:user.id,email} , process.env.token_verify , {expiresIn:"1hr"});

    // let link =`${req.protocol}://${req.headers.host}/med/v1/user/confirm/${token}`;
    // let message = `verify your email <a href="${link}">click here</a>`;
    // sendEmail(email,message);




    await user.save();
    res.status(200).json({message:"done",user});    

    }));



    /* -------------------------------------------------------------------------- */
    /*                                confirm email                               */
    /* -------------------------------------------------------------------------- */

    userRouter.get("/confirm/:token",asyncHandler(async(req,res,next)=>
{
 
  
    let {token} = req.params;

    let decoded = jwt.verify(token,process.env.token_verify);
    if (!decoded) 
    {
        // res.status(400).json({message:"invalid token"});
       return next(new Error("invalid token" , {cause:400}))
    }
       let user = await User.findOne({where:{id:decoded.id}});
       user.verified=true;
       user.save();

       res.status(201).json({message:"done",user})

 
}));


    /* -------------------------------------------------------------------------- */
    /*                                   SignIn                                   */
    /* -------------------------------------------------------------------------- */



userRouter.post("/signin" ,validation(signinSchema) ,

asyncHandler(async (req,res,next) => {

    let user = await User.findOne({ where: {email: req.body.email }});

    if (!user) {

        return next(new AppError("you need to register first", 401));

    }
        let password = bcrypt.compareSync(req.body.password, user.password);

        if (!password) {

            return next(new AppError("the password is incorrect", 400))

        }; 
            let token = jwt.sign({ email: user.email, id: user.id ,qlf:user.qualification ,role:user.role,pay:user.pay}, process.env.token_key);
            res.status(200).json({ message: "done", user, token });
        
        }));

  /* -------------------------------------------------------------------------- */
  /*                               change password                              */
  /* -------------------------------------------------------------------------- */

  userRouter.put("/changepassword",authMiddleware(accepted.all),validation(changePasswordSchema),

asyncHandler(async(req,res,next)=>{
    
    let user = await User.findOne({where:{id:req.user.id}});
   
    let checkPassword = bcrypt.compareSync(req.body.password ,user.password);
    if (!checkPassword) return next(new AppError("incorrect password" ,401));
    const hashed = bcrypt.hashSync(req.body.new_password, parseInt(process.env.salt));

     user.password =hashed;
     await user.save()
    res.status(201).json({message:"done",user})    


}));

/* -------------------------------------------------------------------------- */
/*                               forget password                              */
/* -------------------------------------------------------------------------- */


/* -------------------------------- email require -------------------------------- */

  // get all users_______

  userRouter.get('',

  asyncHandler(async(req,res)=>{
  
  
      const users = await User.findAll();
  
      res.status(200).json({messaage:"done",result:users})
  }));
  
  // get specific user
  
  
  userRouter.get('/:id',
  
  asyncHandler(async(req,res,next)=>{
  
      let {id} = req.params;
      const user = await User.findOne({where:{id}});
      if(!user){
        return next(new AppError("user not found",400));
      }
  
      res.status(200).json({messaage:"done",user})
  }));



module.exports=userRouter; 
