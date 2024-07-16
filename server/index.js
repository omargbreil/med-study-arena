const express = require("express");
require('dotenv').config();
const {connection} = require("./db_connection/connection");
const globalError = require("./utilities/handelError/globalError");
const userRouter = require("./routes/user/user.router");
const courseRouter = require("./routes/course/course.router");
const cors= require("cors");
const morgan = require("morgan");
const us_student_Router = require("./routes/q_questions/us_student/us_student.router");
const int_student_Router = require("./routes/q_questions/int_student/int_student.router");
const gratuateRouter = require("./routes/q_questions/graduate/graduate.router");
const videoRouter = require("./routes/video/video.router");
const paymentRouter = require("./routes/payment/payment");
const trackRouter = require("./routes/track/track.router");




const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan())




app.use('/arena/v1/user',userRouter);
app.use('/arena/v1/course',courseRouter);
app.use('/arena/v1/us_student',us_student_Router);
app.use('/arena/v1/int_student',int_student_Router);
app.use('/arena/v1/graduate',gratuateRouter);
app.use('/arena/v1/video',videoRouter);
app.use('/arena/v1/payment',paymentRouter);
app.use('/arena/v1/track',trackRouter);



    

connection();



let port = process.env.port;



app.listen(port,()=>console.log(`server running at ${port}`));