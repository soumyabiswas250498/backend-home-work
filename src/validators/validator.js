import { ApiError } from '../utils/ApiError.js';
import httpStatus from 'http-status';

const validator = async (data, schema) => {
    try {
        await schema.validateAsync(data);
        return true;
    } catch (error) {
        console.error(error.details[0].message, '***error');
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            error.details[0].message.replace(/"/g, "'")
        );
    }
};

export default validator;
