import express from "express";
import userRouter from './routes/user.route.js';


const app = express(); //create an express app

app.use(express.json());//give ability to our server to parse the request 

//route decalaration
app.use("/api/v1/users", userRouter);//all routes for user module
//example route: http://localhost:4000/api/v1/users/register


export default app;