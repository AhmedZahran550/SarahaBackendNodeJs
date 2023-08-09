
import  joi  from 'joi';
import { Types } from 'mongoose';
const dataMethods =["body" , "params" , "query"];

const idValidation = (value , helper)=>{
    return Types.ObjectId.isValid?true: helper.message("in-valid user ID ")
}

export const  globalFields = {
    id:joi.string().custom(idValidation).required(),
    email:joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required(),
    cpassword: joi.string().required(),
    phone: joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)).required(),    
}

export const validation = (schema)=>{
     return (req,res,next)=>{
        const validationErrors = [];
        dataMethods.map((key) => {
            if (schema[key]) {
                const result = schema[key].validate(req[key], { abortEarly: false });
                if (result?.error) {
                    validationErrors.push(result);
                }
            }
        });
        if (validationErrors.length) {
            return res.status(406).json({Error:"validation Error" , validationErrors});
        }
        return next();
     }
}