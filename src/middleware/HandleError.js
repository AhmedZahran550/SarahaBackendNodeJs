

export const asyncHandler = (fn)=>{
     return (req,res,next)=>{
        fn(req,res,next).catch((error)=>{
         return next(new Error(error,{cause:500}))
        });
     };
};



export const globalErrorHandler = (error,req,res,next)=>{
    if (error) {
            return res.status(error.cause || 500).json({error , message:error.message , stack:error.stack})
    }
}