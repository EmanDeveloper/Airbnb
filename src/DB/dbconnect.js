import mongoose from "mongoose";

async function dbconnection() {
  try {
      
    await mongoose.connect(`${process.env.DB_URL}/Airbnb`);
    console.log("Data base connected")
  
  } catch (error) {
    console.log("DB connection error",error);
  }
}

export default dbconnection;
