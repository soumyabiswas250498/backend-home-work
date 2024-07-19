import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const fileUploader = async (path) => {
    try {
        const data = new FormData();
        data.append('file', fs.createReadStream(path));
        data.append('sitename', 'hw-pmgsv-in')

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://files.pmgsv.in/upload.php',
            headers: {
                'Authorization': process.env.FILE_SERVER_SECRET,
                ...data.getHeaders()
            },
            data: data
        };

        const response = await axios.request(config);
        console.log(response.data.file);
        return response.data.file; // Ensure this returns the file name or URL
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled by the calling function
    }
};
