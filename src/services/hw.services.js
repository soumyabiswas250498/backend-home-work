import { HomeWork } from "../models/homework.model.js";
import { ApiError } from "../utils/ApiError.js";


const addHomeWorkService = async (data) => {
    const { author, classroom, section, subject, heading, description, file } = data;

    const newHomeWork = HomeWork.create({
        author: author,
        class: classroom,
        section: section,
        subject: subject,
        heading: heading,
        description: description,
        file: file
    })

    return newHomeWork;
}

const allHomeWorkServices = async () => {
    const homeWorks = await HomeWork.find().populate('author', 'userName email _id').exec();
    console.log(homeWorks, '***hw')
    return homeWorks
}

const deleteHWService = async (id, user) => {
    const { id: userId, role } = user;
    console.log(userId, role, '***del')
    const deletedHW = await HomeWork.findById(id);
    if (!deletedHW) {
        throw new ApiError(404, 'Homework Not Found')
    }

    if (role === 'admin' || userId.equals(deletedHW.author)) {
        await HomeWork.deleteOne({ _id: id })
    }

    return deletedHW;
}


export { addHomeWorkService, allHomeWorkServices, deleteHWService }