import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Function to delete a file in the uploads folder
async function deleteFile(fileName) {
    try {
        // Construct the absolute path to the file
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, '..', 'uploads', fileName);

        // Check if the file exists
        try {
            await fs.access(filePath);
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error('File does not exist:', filePath);
                return null;
            } else {
                throw err;
            }
        }

        // Delete the file
        await fs.unlink(filePath);
        return fileName;
    } catch (error) {
        throw error;
    }
}

export { deleteFile }
