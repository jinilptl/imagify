import express from "express";
import{signup,login,userCredit} from "../controllers/usercontrollers.js";
import { auth } from "../middlewares/auth.js";

const userRouter=express.Router();


userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.get("/credits",auth,userCredit);


export default userRouter;