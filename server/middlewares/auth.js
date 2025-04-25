import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const auth=async (req,res,next)=>{

console.log("hearders is ",req.headers);


    try {
        
         console.log("req.headers.authorization inside ", req.headers.authorization);

    const token = req.header("Authorization")?.replace("Bearer ", "");
   console.log("new tokn is ",token);
   

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

//   decode token 

try {
    
    const DecodeToken=jwt.verify(token,process.env.JWT_SECRET);
    console.log("Decoded token is", DecodeToken);

    req.user=DecodeToken.id;
} catch (error) {
      // Token verification issue
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
}
next();
    } catch (error) {
        console.log("error is ",error);
        
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
          });
    }
}
