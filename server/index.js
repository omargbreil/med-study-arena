const express = require("express");
require('dotenv').config();
const {connection} = require("./db_connection/connection");
const globalError = require("./utilities/handelError/globalError");
const userRouter = require("./routes/user/user.router");
const courseRouter = require("./routes/course/course.router");
const cors= require("cors");
const morgan = require("morgan");
const videoRouter = require("./routes/video/video.router");
const paymentRouter = require("./routes/payment/payment");
const trackRouter = require("./routes/track/track.router");




const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan())

app.get('',(req,res)=>{
    res.json({message:"done"})
})



app.use('/arena/v1/user',userRouter);
app.use('/arena/v1/course',courseRouter);
app.use('/arena/v1/video',videoRouter);
app.use('/arena/v1/payment',paymentRouter);
app.use('/arena/v1/track',trackRouter);



    

connection();

app.use(globalError)



let port = process.env.port;



app.listen(port,()=>console.log(`server running at ${port}`));