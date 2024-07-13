import { HomeWork } from "../models/homework.model.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFile } from "../utils/deleteFile.js";


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

    const deletedHW = await HomeWork.findById(id);
    if (!deletedHW) {
        throw new ApiError(404, 'Homework Not Found')
    }

    if (role === 'admin' || userId.equals(deletedHW.author)) {
        const deletedFile = await deleteFile(deletedHW?.file)
        if (deletedFile) {
            await HomeWork.deleteOne({ _id: id })
        } else {
            throw new ApiError(404, 'File Not Found')
        }

    }

    return deletedHW;
}

const updateHWService = async (id, user, data) => {
    const { id: userId, role } = user;
    const oldHW = await HomeWork.findById(id);
    if (!oldHW) {
        throw new ApiError(404, 'Homework Not Found');
    } else {
        if (role === 'admin' || userId.equals(deletedHW.author)) {

            const newData = {
                author: data?.author || oldHW?.author,
                class: data?.classroom || oldHW?.class,
                section: data?.section || oldHW?.section,
                subject: data?.subject || oldHW?.subject,
                heading: data?.heading || oldHW?.heading,
                description: data?.description || oldHW?.description,
                file: data?.file || oldHW?.file
            }
            data?.file && await deleteFile(oldHW?.file)
            const newHW = await HomeWork.findByIdAndUpdate(id, newData);
            return newHW;
        }
    }

}


export { addHomeWorkService, allHomeWorkServices, deleteHWService, updateHWService }