import { addHomeWorkService, allHomeWorkServices, deleteHWService, updateHWService } from "../services/hw.services.js";
import { asyncHandlerExpress } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addHomeWorkController = asyncHandlerExpress(
    async (req, res) => {
        const { classroom, section, subject, heading, description } = req.body;
        const file = req.file;
        const createdHomework = await addHomeWorkService({ classroom, section, subject, heading, description, author: req.user.id, file: file.filename })
        res.status(200).json(new ApiResponse(201, { createdHomework }, 'Home Work Added Successfully'));
    }
);

const getAllHomeWork = asyncHandlerExpress(
    async (req, res) => {
        console.log('Hello')
        const allHW = await allHomeWorkServices();
        res.status(200).json(new ApiResponse(201, allHW, 'All Homeworks Fetched Successfully'))
    }
);

const deleteHomeWork = asyncHandlerExpress(
    async (req, res) => {
        const { id } = req.query;
        const deletedData = await deleteHWService(id, req.user);
        console.log(deletedData);
        res.status(204).json(new ApiResponse(204, deletedData, 'Homeworks Deleted Successfully'))
    }
)

const updateHomeWork = asyncHandlerExpress(
    async (req, res) => {
        const { id } = req.query;
        const { classroom, section, subject, heading, description } = req.body;
        const file = req?.file;
        const updatedHW = await updateHWService(id, req.user, { classroom, section, subject, heading, description, author: req.user.id, file: file?.filename });
        res.status(200).json(new ApiResponse(201, updatedHW, 'All Homeworks Updated Successfully'))
    }
)

export { addHomeWorkController, getAllHomeWork, deleteHomeWork, updateHomeWork }