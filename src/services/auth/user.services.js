import { User } from "../../models/users.model.js";
import bcrypt from 'bcrypt';
import { ApiError } from "../../utils/ApiError.js";
import randomstring from "randomstring";
import { sendEmail } from "../../utils/sendEmail.js";





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

    const createdObj = await User.create({ userName, email, password: passwordTemp });
    await sendEmail(email, 'created', { userName: userName, email: email, password: passwordTemp })
    return { userName: createdObj.userName, email: createdObj.email };
}

const updateUserService = async (id, params) => {
    let pass;
    params?.password && (params.password = randomstring.generate({
        length: parseInt(process.env.PASS_LENGTH),
        charset: 'alphanumeric'
    }));
    pass = params?.password;
    if (params?.password) {
        params.password = await bcrypt.hash(params?.password, 8);
    }
    const updatedUser = await User.findByIdAndUpdate(id, params, { new: true });
    await sendEmail(updatedUser.email, 'updated', { userName: updatedUser.userName, email: updatedUser.email, password: pass || 'Unchanged' })
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




export { createUser, checkExistingUser, updateUserService, getUser, generateAccessRefreshToken, passwordCheck }

