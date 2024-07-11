import { asyncHandlerExpress } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createUser, passwordCheck } from "../services/auth/user.services.js";



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






export { userLogin, addUser }