const joi = require('joi');
const AppError = require('../../utilities/handelError/appErrorClass');


/* -------------------------------------------------------------------------- */
/*                                   SignUp                                   */
/* -------------------------------------------------------------------------- */
module.exports.signupSchema = {

body:joi.object({
    name: joi.string().error(new AppError('Name must be a string',400))
        .alphanum().error(new AppError('Name can only contain alphabets and numbers',400))
        .min(3).error(new AppError('Name should have at least 3  characters',400))
        .max(30).error(new AppError('Name cannot exceed 30 characters ',400))
        .required().error(new AppError('Name is required')),

    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error(new AppError('Password format is incorrect',400)),

    // repeat_password: joi.ref('password'),

    // access_token: [
    //     joi.string(),
    //     joi.number()
    // ],

    phone:joi.string().
    pattern(new RegExp('^[0-9]{11}$')).error(new AppError('Phone number should contain exactly 11 digits ',400))
    .required(),    

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
        
    country:joi.string().required()
    


})

}


/* -------------------------------------------------------------------------- */
/*                                   SignIn                                   */
/* -------------------------------------------------------------------------- */
module.exports.signinSchema = {

body:joi.object({
        
        email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

     password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).error(new AppError('Password format is incorrect',400)),

})

};

/* -------------------------------------------------------------------------- */
/*                            changePasswordSchema                            */
/* -------------------------------------------------------------------------- */
module.exports.changePasswordSchema = {

body:joi.object({

    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    new_password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

})

}