import jwt from "jsonwebtoken"


export const getToken = ({payload = '' , secretKey=process.env.SECRET_TOKEN_KEY}={})=>{
return jwt.sign(payload ,secretKey)
}


export const verifyToken = ({token='' , secretKey=process.env.SECRET_TOKEN_KEY}={})=>{
    return jwt.verify(token , secretKey)
}