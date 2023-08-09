
import { Router } from 'express';
import * as controller from "./controller/users.controller.js"
import authToken from './../../middleware/auth';
const router = Router();



router.get("profile" ,authToken ,controller.profile)




export default router ;
