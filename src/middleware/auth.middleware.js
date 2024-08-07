import { ApiError } from "../utils/ApiError.js";
import { asyncHandlerExpress } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { getUser } from "../services/auth/user.services.js";

export const verifyJWT = asyncHandlerExpress(
    async (req, res, next) => {
        const headerToken = req.headers?.authorization;
        const token = req.cookies?.accessToken || headerToken;
        if (!token) {
            throw new ApiError(401, 'Unauthorized Access');
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await getUser({ id: decodedToken._id });
        if (!user) {
            throw new ApiError(401, 'Invalid access token');
        }
        req.user = user;
        next();
    }

)

export const isAdmin = asyncHandlerExpress(
    (req, res, next) => {
        const { user } = req;

        if (user.role === 'admin') {
            next();
        } else {
            throw new ApiError(401, 'Permission Denied');
        }

    }
)

