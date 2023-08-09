
import { asyncHandler } from './../../../middleware/HandleError.js';
import { userModel } from './../../../../DB/models/user/user.model.js';
import { compereHash, generateHash } from '../../../utils/hash&comper.js';
import { sendEmail } from './../../../services/sendEmail.js';
import { getToken, verifyToken } from './../../../utils/tokenGen&verify.js';




// sign UP 
export const signUp = asyncHandler(async (req, res, next) => {
   const { fullName, email, password } = req.body;
   const founded = await userModel.findOne({ email });
   if (founded) {
      return next(new Error("Email Exist ", { cause: 409 }));
   }
   const hashed = generateHash({ plainText: password });
   const user = await userModel.create({ fullName, email, password: hashed });
   const token = getToken({ payload: { email, id: user._id }, secretKey: process.env.VERIFY_TOKEN_KEY });
   const url = `${req.protocol}://${req.headers.host}/auth/verify/${token}`;
   const response = await sendEmail(email, "verifyEmail", `<a href=${url}>Click here to verify </a>`);
   if (!response) {
      await userModel.deleteOne({ _id: user.id });
      return next(new Error("Email Rejected ", { cause: 400 }));
   }
   return res.status(201).json({ message: 'Email verification message send to you' });
});


// verify Email  
export const verifyEmail = asyncHandler(async (req, res, next) => {
   const { token } = req.params;
   const { email, id } = verifyToken({ token, secretKey: process.env.VERIFY_TOKEN_KEY });
   const verifyUser = await userModel.findOneAndUpdate({ email, _id: id }, { verified: true });
   if (!verifyUser) {
      return next(new Error("Email does`t exist ", { cause: 401 }));
   }
   return res.status(200).json({ message: "done" });
});


// login 
export const login = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userModel.findOne({ email });
   if (!user) {
      return next(new Error("Email does`t exist", { cause: 404 }));
   }
   if (!user.verified) {
      const token = getToken({ payload: { email, id: user._id }, secretKey: process.env.VERIFY_TOKEN_KEY });
      const url = `${req.protocol}://${req.headers.host}/auth/verify/${token}`;
      const response = await sendEmail(email, "verifyEmail", `<a href=${url}>Click here to verify </a>`);
      return next(new Error("your Email is not verified pls verify first"))
   }
   const matched = compereHash({ plainText: password, hashedText: user.password });
   if (!matched) {
      return next(new Error("Wrong Password", { cause: 406 }));
   }
   user.active = true ;
   await user.save();
   const token = getToken({payload:{ id: user.id, email: user.email }});
   return res.status(200).json({ message: 'done', token });
});


// logout 
export const logOut = asyncHandler(async(req,res,next)=>{
   const {_id} = req.user ;
   const loggedOut = await userModel.updateOne({_id},{active:false}) ;
   return res.json({message:"done"});
})
 

// forget password and rest the password  

export const  forgetPassword =asyncHandler(async(req,res,next)=>{
     const {email} = req.body ;
     const user = await userModel.findOne({email});
     if (!user) {
       return  next(new Error("Email not exist ",{cause:404}))
     }
     const code = Math.floor(Math.random() * (9001) + 1000);
     user.code = generateHash({plainText: JSON.stringify(code)});
     await user.save();
     await sendEmail(email, "Rest password Code ", `<h1>verifying code is : ${code}</h1>`);
     return res.json({ message: " verify code send to your Email "});
})

// check code  
export const codeCheck =asyncHandler(async(req,res,next)=>{
   const {email , code } = req.body ;
   const user = await userModel.findOne({email});
   if (!user) {
      return  next(new Error("in-valid Email",{cause:404}))
   }
   const matched = compereHash({plainText:JSON.stringify(code) ,hashedText:user.code });
   if (!matched) {
      return  next(new Error("in-valid code ",{cause:406}))
   }
   const token = getToken({ payload:{id:user.id , email}});
   return res.json({ message: "done", token });
});


//  Rest Password 
export const RestPassword = asyncHandler(async (req, res, next) => {
   const { newPassword } = req.body;
   const hashed = generateHash({plainText:newPassword});
   const user = await userModel.findByIdAndUpdate(req.user?.id, { password: hashed, $unset: { code: 1 } });
   return res.json({ message: "done" });

});