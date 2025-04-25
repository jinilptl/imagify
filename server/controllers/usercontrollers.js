import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "all fields are required" });
    }
  const findUser=await userModel.findOne({email});

  if(findUser){
    return res.status(200).json({success:false,message:"user already register,please login"})
  }
    const hashpassword = await bcrypt.hash(password, 10);

    const userData = {
      name: name,
      email: email,
      password: hashpassword,
    };

    const newuser = new userModel(userData);

    const user = await newuser.save();

    const tokenPayload = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({
      success: true,
      message: "user signup successfully",
      user: { name: user.name },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(200)
        .json({ success: false, message: "all fields are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(200).json({ success: false, message: "user does not Exits" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const tokenPayload = {
        id: user._id,
        name: user.name,
      };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

      return res.status(200).json({
        success: true,
        message: "user login successfully",
        user: { name: user.name },
        token,
      });
    } else {
      res.status(200).json({ success: false, message: "invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const userCredit=async(req,res)=>{
    try {
        const userID = req.user;

        const user=await userModel.findById(userID);
        return res.status(200).json({
            success:true,
            message:"credi balance fetch successfuly",
            credits:user.creditBalance,
            user:{name:user.name}
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({ success: false, message: error.message });
    }
}