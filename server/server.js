import express from "express";
import cors from "cors"
import "dotenv/config"
import DbConnect from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT=process.env.PORT||4000;

const app=express();

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/image',imageRouter);

app.get("/",(req,res)=>{
    res.send("home route,api working")
})

await DbConnect()
app.listen(PORT,()=>{
    console.log("app is working fine");
    
})