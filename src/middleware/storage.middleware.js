import multer from "multer";
import { asyncHandlerExpress } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { fileUploader } from "../utils/FileUploader.js";
import fs from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `v${Date.now()}-${file.originalname}`);
    }
});

// File filter to check mime type
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false);
    }
};

// Multer configuration with limits and file filter
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter
});

const uploadSingleMiddleware = asyncHandlerExpress((req, res, next) => {
    upload.single('file')(req, res, async (err) => {
        const filePath = req?.file?.path;

        console.log(err, '***fileError');
        console.log(filePath, '***filePath');

        if (!filePath) {
            req.noFile = true;
            next();
            return;
        }

        try {
            const fileName = await fileUploader(filePath);
            console.log(fileName, '***fn');
            if (!fileName) {
                return res.status(500).json({ error: 'File upload failed' });
            }
            // Delete the file from disk storage
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Failed to delete local file:', err);
                }
            });

            console.log(fileName, '***unlink Success');

            req.file.serverUploadedName = fileName;

            next();
        } catch (error) {
            return res.status(500).json({ error: 'File upload failed' });
        }
    });
});

export { uploadSingleMiddleware };
