import { asyncHandlerExpress } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createUser, passwordCheck, updateUserService } from "../services/auth/user.services.js";




const userLogin = asyncHandlerExpress(
    async (req, res) => {
        const { email, password } = req.body;
        const { accessToken, refreshToken, userName, role } = await passwordCheck(email, password);
        const options = {
            httpOnly: true,
            secure: true,
        };
        res.cookie('accessToken', accessToken, options).json(new ApiResponse(201, {
            userName, email, role, 'refreshToken': refreshToken
        }, 'User Successfully Logged In'));
    }
);

const addUser = asyncHandlerExpress(
    async (req, res) => {
        const { userName, email, password } = req.body;
        const newUser = await createUser(userName, email, password);
        res.status(201).json(new ApiResponse(201, { userName, email, password }, 'User Added Successfully'));
    }
)


const updateUser = asyncHandlerExpress(
    async (req, res) => {
        const { email, userName, password } = req.body;
        const { id } = req.query
        const updatedData = await updateUserService(id, { email, userName, password });
        res.status(201).json(new ApiResponse(201, { updatedData }, 'User Updated Successfully'));
    }
)






export { userLogin, addUser, updateUser }