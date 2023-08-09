import { Router } from "express";
import * as controller from './controller/auth.controller.js';
import *as validators from './auth.validation.js';
import { validation } from './../../middleware/validation.js';
import authToken from './../../middleware/auth.js';


const router = Router();

// router.get("/" , (req,res,next)=>{ next(new Error("check Errors "))})
router.post("/signUp", validation(validators.singUp), controller.signUp);
router.get("/verify/:token", controller.verifyEmail);
router.patch("/login", validation(validators.login), controller.login);

router.patch("/logout", authToken, controller.logOut);

router.post("/forgetPass", validation(validators.forgetPass), controller.forgetPassword);
router.post("/code", validation(validators.codeCheck), controller.codeCheck);
router.patch("/RestPass", authToken , validation(validators.RestPassword), controller.RestPassword);

export default router;


