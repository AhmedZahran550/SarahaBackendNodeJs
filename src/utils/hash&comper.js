import bcrypt, { compareSync, hashSync }   from 'bcrypt'

export const generateHash =({plainText='' , saltRounds=process.env.SALT_ROUNDS}={})=>{
const hashed = hashSync(plainText ,parseInt(saltRounds));
return hashed ;
}


export const compereHash = ({plainText='' , hashedText=''}={})=>{
    const match = compareSync(plainText , hashedText);
    return match ;
}