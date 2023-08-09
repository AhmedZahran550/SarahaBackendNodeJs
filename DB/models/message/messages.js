import mongoose, { model, Schema, Types } from "mongoose";


const schema =new  Schema({
    text:{
        type:String,
        require:true,
    },
    receiver:{
        type:Types.ObjectId,
        ref:"User",
        require:true
    }

},{ 
    timestamps:true
})

export const messageModel = mongoose.models.Message || model("Message", schema);