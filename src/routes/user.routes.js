import { Router } from "express";
import { userLogin, addUser, updateUser } from "../controller/users.controller.js";
import { verifyJWT, isAdmin } from "../middleware/auth.middleware.js";


const userRouter = Router();


userRouter.post('/login', userLogin);
userRouter.post('/add', verifyJWT, isAdmin, addUser);
userRouter.put('/update', verifyJWT, isAdmin, updateUser);



export default userRouter;