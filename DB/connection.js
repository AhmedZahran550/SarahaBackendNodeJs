import mongoose from "mongoose";



export const connectDB = async()=>{
     mongoose.set('strictQuery', true);
   return await  mongoose.connect(process.env.LOCAL_DB_URL).then(result =>
    console.log('connected to DB  ........')).catch(err=>console.log("error .......DB"))
}




