import { User } from "../../models/users.model.js";
import bcrypt from 'bcrypt';
import { ApiError } from "../../utils/ApiError.js";
import randomstring from "randomstring";

const checkExistingUser = async (params) => {
    const { userName, email } = params
    const user = await User.findOne({
        $or: [{ userName }, { email }]
    })
    return {
        userName: userName === user?.userName,
        email: email === user?.email,
    }
}

const getUser = async (params) => {
    const { userName, email, id } = params;
    const user = await User.findOne({
        $or: [{ userName }, { email }, { _id: id }]
    })
    return {
        userName: user.userName,
        email: user.email,
        role: user.role,
        id: user._id,
    }
}


const createUser = async (userName, email, password) => {
    let passwordTemp = password || randomstring.generate({
        length: parseInt(process.env.PASS_LENGTH),
        charset: 'alphanumeric'
    })
    console.log(passwordTemp, '***')
    const createdObj = await User.create({ userName, email, password: passwordTemp });
    return { userName: createdObj.userName, email: createdObj.email };
}

const updateByEmail = async (email, params) => {
    const updatedUser = await User.findOneAndUpdate({ email }, params);
    return { email: updatedUser.email, userName: updatedUser.userName };
}


const generateAccessRefreshToken = async (user) => {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
}

const passwordCheck = async (email, password) => {
    const user = await User.findOne({ email });
    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
    }
    const { accessToken, refreshToken } = await generateAccessRefreshToken(user);
    return { accessToken, refreshToken, userName: user.userName, role: user.role };


}




export { createUser, checkExistingUser, updateByEmail, getUser, generateAccessRefreshToken, passwordCheck }

