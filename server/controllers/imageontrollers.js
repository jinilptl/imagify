import userModel from "../models/userModel.js";
import FormData from "form-data"
import axios from "axios";


export const ImageGenerate=async(req,res)=>{
    try {
        const userID=req.user;
        const{prompt}=req.body

        const user=await userModel.findById(userID); 
        if(!user||!prompt){

          res.status(200).json({ success: false, message: " missing Details" });
        }

        if(user.creditBalance===0|| user.creditBalance<0){
            return res.status(200).json({ success: false, message: " no Credit Balance" , creditBalance:user.creditBalance});
        }

       const formData=new FormData()
       formData.append("prompt",prompt)

       const {data}=await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
        headers: {
            'x-api-key': process.env.CLIPDROP_API,
          },responseType:"arraybuffer"
       });

       const base64Image= Buffer.from(data,'binary').toString("base64");

       const resultImage=`data:image/png;base64,${base64Image}`;

       const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { creditBalance: user.creditBalance - 1 },
        { new: true } // returns updated document
      );

       return res.status(200).json({success:true,message:"image generate succesfuly",resultImage,creditBalance:updatedUser.creditBalance})
        
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({ success: false, message:error.message});
    }
}
