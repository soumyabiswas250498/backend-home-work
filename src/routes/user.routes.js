import { Router } from "express";
import { userLogin, addUser, updateUser, getAllUsersData, deleteUserController } from "../controller/users.controller.js";
import { verifyJWT, isAdmin } from "../middleware/auth.middleware.js";


const userRouter = Router();


userRouter.post('/login', userLogin);
userRouter.post('/add', verifyJWT, isAdmin, addUser);
userRouter.get('/all', verifyJWT, isAdmin, getAllUsersData)
userRouter.put('/update', verifyJWT, isAdmin, updateUser);
userRouter.delete('/delete', verifyJWT, isAdmin, deleteUserController)



export default userRouter;