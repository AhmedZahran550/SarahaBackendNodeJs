
import { asyncHandler } from './../../../middleware/HandleError.js';
import { userModel } from './../../../../DB/models/user/user.model.js';
import { messageModel } from './../../../../DB/models/message/messages.js';


export const addMessage =asyncHandler(async (req,res,next)=>{
    const {text , receiver} = req.body ;
    const user = await userModel.findById(receiver);
    if (!user) {
        return next(new Error("this user does`t exist " , {cause : 404}))
    }
    const message  = await messageModel.create({text , receiver});
    return res.status(201).json({message:"done" ,data:message });
})

export const getMessages =asyncHandler(async(req,res,next)=>{
    const {_id} = req.user ;
    const messages = await messageModel.find({receiver:_id}).sort({createdAt: -1});
    return res.status(200).json({message:"done" , data:messages ,_id});
})

export const deleteMessage = asyncHandler(async(req,res,next)=>{
    const {id} = req.params ;
    const {_id:receiver} = req.user ;
    const deleted = await messageModel.deleteOne({_id:id ,receiver }) ;
    return res.status(200).json({message:"done"})
})