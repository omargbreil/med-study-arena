const AppError = require("../handelError/appErrorClass");
const asyncHandler = require("../handelError/asyncHandler");



 const validation = (Schema)=>
{
    return  asyncHandler(async(req,res,next)=>
    {
        let validationType=["body" , "query" , "params" , "headers"];
        let validationError=[];

        

        validationType.forEach(key => 
        {
            if (Schema[key]) 
            {
                
                let valid = Schema[key].validate(req[key],{abortEarly:true});
                

                if (valid.error) 
                {
                    
                    validationError.push(valid.error)
                }   
            }    
        });

        if (validationError.length) 
        {
           return next(new AppError( validationError, 400))
            
        }else
        {
            next()
        }

        
    })
}

module.exports=validation