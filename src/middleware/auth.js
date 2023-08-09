
import { verifyToken } from '../utils/tokenGen&verify.js';
import { asyncHandler } from './HandleError.js';
import { userModel } from './../../DB/models/user/user.model.js';



const authToken = asyncHandler(async (req,res,next)=>{
    const {authorization} = req.headers ;
    if (!authorization?.startsWith(process.env.BEARER)) {
        return next(new Error("in-valid Bearer token"));
    }
    const token = authorization.split(process.env.BEARER)[1];
    if (!token) {
        return next(new Error('in-valid token'));
    }
    const decoded = verifyToken({token});
    if (!decoded?.id) {
        return next(new Error("in-valid token "), {cause:403})
    }
    const user = await userModel.findById(decoded.id);
    if (!user) {
        return next(new Error("user Not found please signup " , {cause:404}))
    }
    if (!user?.active & !user.code) {
        return next(new Error("login first " , {cause:403}))
    }
    req.user = user ;

    next();

});

export default authToken ;