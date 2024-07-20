import axios from "axios"

// Function to delete a file in the uploads folder
async function deleteFile(fileName) {
    try {
        const res = await axios.post('https://files.pmgsv.in/delete.php', {
            "sitename": "hw-pmgsv-in",
            "filename": fileName
        }, {
            headers: {
                'Authorization': process.env.FILE_SERVER_SECRET,
            }
        })
        console.log(res.data, '***')
        return res.data?.success

    } catch (error) {
        console.log(error);
        return;
    }

}

export { deleteFile }
