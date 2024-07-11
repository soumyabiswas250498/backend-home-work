import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { userLogin, addUser } from '../controller/users.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';
import { uploadSingleMiddleware } from '../middleware/storage.middleware.js';
import { addHomeWorkController, getAllHomeWork, deleteHomeWork } from '../controller/hw.controller.js';

const hwRouter = Router();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

hwRouter.post('/add', verifyJWT, uploadSingleMiddleware, addHomeWorkController);
hwRouter.get('/all', getAllHomeWork);
hwRouter.delete('/delete', verifyJWT, deleteHomeWork)


hwRouter.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'File not found' });
        }
    });
});

export default hwRouter;
