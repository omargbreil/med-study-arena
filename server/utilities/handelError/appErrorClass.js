class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// In the line Error.captureStackTrace(this, this.constructor), the this keyword refers to the current instance of the AppError class.

// The Error.captureStackTrace() method is used to capture the stack trace of an error. It assigns the captured stack trace to the error object, which in this case is the this object (the current instance of the AppError class).

// The second argument this.constructor is used to specify the constructor function that should be used to create the stack trace. In this case, this.constructor refers to the AppError constructor function itself. By passing this.constructor as the second argument, the captured stack trace will be associated with the AppError class rather than with the Error class or any other potential caller.

// By capturing the stack trace, you can obtain a detailed trace of function calls that led to the creation of the AppError object. This can be useful for debugging and understanding the context in which the error occurred.

module.exports=AppError;    