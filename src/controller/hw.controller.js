import { addHomeWorkService, allHomeWorkServices, deleteHWService, updateHWService, getHomeWorkByID } from "../services/hw.services.js";
import { asyncHandlerExpress } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import validator from "../validators/validator.js";
import { homeworkSchema, idSchema } from "../validators/hw.validator.js";

const addHomeWorkController = asyncHandlerExpress(
    async (req, res) => {
        await validator(req.body, homeworkSchema)
        const { classroom, section, subject, heading, description } = req.body;
        const file = req.file.serverUploadedName;
        const createdHomework = await addHomeWorkService({ classroom, section, subject, heading, description, author: req.user.id, file: file })
        res.status(200).json(new ApiResponse(201, { createdHomework }, 'Home Work Added Successfully'));
    }
);

const getAllHomeWork = asyncHandlerExpress(
    async (req, res) => {
        const { classRoom, subject, authorId } = req.query;
        const allHW = await allHomeWorkServices({ classRoom, subject, authorId });
        res.status(200).json(new ApiResponse(201, allHW, 'All Homeworks Fetched Successfully'))
    }
);

const getHomeWork = asyncHandlerExpress(
    async (req, res) => {
        const { id } = req.params;
        await validator(req.params, idSchema)
        const hw = await getHomeWorkByID(id);
        res.status(200).json(new ApiResponse(201, hw, 'Homework Fetched Successfully'))
    }
)

const deleteHomeWork = asyncHandlerExpress(
    async (req, res) => {
        await validator(req.query, idSchema)
        const { id } = req.query;
        const deletedData = await deleteHWService(id, req.user);
        res.status(204).json(new ApiResponse(204, deletedData, 'Homeworks Deleted Successfully'))
    }
)

const updateHomeWork = asyncHandlerExpress(
    async (req, res) => {
        const { id } = req.query;
        await validator(req.query, idSchema)
        const { classroom, section, subject, heading, description } = req.body;
        const noFile = req.noFile;
        if (noFile) {
            const updatedHW = await updateHWService(id, req.user, { classroom, section, subject, heading, description, author: req.user.id });
            res.status(200).json(new ApiResponse(201, updatedHW, 'All Homeworks Updated Successfully'))

        } else {
            const file = req.file.serverUploadedName;
            const updatedHW = await updateHWService(id, req.user, { classroom, section, subject, heading, description, author: req.user.id, file: file });
            res.status(200).json(new ApiResponse(201, updatedHW, 'All Homeworks Updated Successfully'))
        }

    }
)

export { addHomeWorkController, getAllHomeWork, deleteHomeWork, updateHomeWork, getHomeWork }