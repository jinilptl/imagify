import mongoose from "mongoose";
import "dotenv/config"

const DbConnect= async()=>{
try {
     await mongoose.connect(`${process.env.MONGODB_URL}`);

    console.log("database connection succesfuly");
    
} catch (error) {
    console.log("error in db connect");
    console.log(error);
  process.exit(1)
    
}
}

export default DbConnect;