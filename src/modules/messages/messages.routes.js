import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import * as validators from './messages.validation.js'
import * as controller from './controller/messages.controller.js'
import authToken from './../../middleware/auth.js';



const router = Router()

router.get("/",authToken, controller.getMessages);
router.post("/:userId/send",validation(validators.addMessage) , controller.addMessage);
router.delete("/:id/delete",authToken,validation(validators.deleteMessage) , controller.deleteMessage);



export default router ;