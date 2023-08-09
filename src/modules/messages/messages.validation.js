
import  joi  from 'joi';
import { globalFields } from '../../middleware/validation.js';



export const addMessage  = {
    body: joi.object({
        text:joi.string().required().max(500),
        receiver : globalFields.id
    }).required()
}

export const deleteMessage  = {
    params: joi.object({
        id : globalFields.id
    }).required()
}