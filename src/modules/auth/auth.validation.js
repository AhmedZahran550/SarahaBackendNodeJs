import joi from "joi";
import { globalFields } from "../../middleware/validation.js";



export const singUp = {
    body:joi.object(
     {
         fullName: joi.string().required(),
         email: globalFields.email,
         password: globalFields.password,
         cpassword:globalFields.cpassword.valid(joi.ref('password'))
     }
 ).required()}; 
 
 
 
 export const login = {
    body:joi.object(
     {
         email: globalFields.email,
         password: globalFields.password,
       
     }
 ).required()};


 export const forgetPass ={
    body:joi.object({
        email:globalFields.email ,
    }).required()
 }

 export const codeCheck ={
    body:joi.object({
        email:globalFields.email,
        code:joi.number().min(1000).max(9999).required()
    }).required()
 }

 export const RestPassword ={
    body:joi.object({
        newPassword: globalFields.password,
        cpassword:globalFields.cpassword.valid(joi.ref('newPassword')),
    }).required()
 }