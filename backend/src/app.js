import express from "express";
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';


const app = express(); //create an express app

app.use(express.json());//give ability to our server to parse the request 

//route decalaration
app.use("/api/v1/users", userRouter);//all routes for user module
//example route: http://localhost:4000/api/v1/users/register

app.use("/api/v1/posts", postRouter);//all routes for post module
//example route: http://localhost:4000/api/v1/posts/
export default app;