import dotenv from "dotenv";
import { app } from "./app.js";
import dbconnection from "./DB/dbconnect.js";

dotenv.config({
    path:"./.env"
})

const PORT=process.env.PORT || 3000;

dbconnection()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`😊App is listen at port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("DB connection error",err)
})
  