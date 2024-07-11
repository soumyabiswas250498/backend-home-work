import { Router } from "express";
import { userLogin, addUser } from "../controller/users.controller.js";
import { verifyJWT, isAdmin } from "../middleware/auth.middleware.js";


const userRouter = Router();


userRouter.post('/login', userLogin);
userRouter.post('/add', verifyJWT, isAdmin, addUser);



export default userRouter;