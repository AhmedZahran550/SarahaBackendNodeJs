import { connectDB } from "../DB/connection.js";
import { globalErrorHandler } from "./middleware/HandleError.js";
import authRouter from './modules/auth/auth.routes.js';
import messageRouter from './modules/messages/messages.routes.js';



export const initApp = (app , express)=>{
connectDB() 
app.use(express.json({}));
app.get('/', (req, res) => res.send('Hello World!'))
app.use("/auth" , authRouter);
app.use("/message" , messageRouter);


app.use(globalErrorHandler)
}