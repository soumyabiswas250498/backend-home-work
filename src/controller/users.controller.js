import { asyncHandlerExpress } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createUser, passwordCheck, updateUserService, getAllUsers, deleteUserService } from "../services/auth/user.services.js";
import validator from "../validators/validator.js";
import { loginSchema, registerSchema, updateSchema } from "../validators/user.validator.js";





const userLogin = asyncHandlerExpress(
    async (req, res) => {
        await validator(req.body, loginSchema)
        const { email, password } = req.body;
        const { accessToken, refreshToken, userName, role } = await passwordCheck(email, password);
        const options = {
            httpOnly: true,
            secure: true,
        };
        res.cookie('accessToken', accessToken, options).json(new ApiResponse(201, {
            userName, email, role, 'refreshToken': refreshToken, 'accessToken': accessToken,
        }, 'User Successfully Logged In'));
    }
);

const addUser = asyncHandlerExpress(
    async (req, res) => {
        await validator(req.body, registerSchema)
        const { userName, email, password } = req.body;
        const newUser = await createUser(userName, email, password);
        res.status(201).json(new ApiResponse(201, { userName, email, password }, 'User Added Successfully'));
    }
)


const updateUser = asyncHandlerExpress(
    async (req, res) => {
        const { email, userName, password } = req.body;
        await validator(req.query, updateSchema)
        const { id } = req.query
        const updatedData = await updateUserService(id, { email, userName, password });
        res.status(201).json(new ApiResponse(201, { updatedData }, 'User Updated Successfully'));
    }
)

const getAllUsersData = asyncHandlerExpress(
    async (req, res) => {

        const users = await getAllUsers();
        res.status(200).json(new ApiResponse(200, { users }, 'User Found Successfully'));

    }
)

const deleteUserController = asyncHandlerExpress(
    async (req, res) => {
        await validator(req.query, updateSchema)
        const { id } = req.query;
        const deletedUser = await deleteUserService(id);
        res.status(200).json(new ApiResponse(200, { deletedUser }, 'User Found Successfully'));
    }
)





export { userLogin, addUser, updateUser, getAllUsersData, deleteUserController }