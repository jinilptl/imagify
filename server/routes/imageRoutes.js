import express from "express";
import { ImageGenerate } from "../controllers/imageontrollers.js";
import { auth } from "../middlewares/auth.js";

const imageRouter=express.Router();


imageRouter.post("/generate-image",auth,ImageGenerate);



export default imageRouter;