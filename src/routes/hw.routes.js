import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';
import { uploadSingleMiddleware } from '../middleware/storage.middleware.js';
import { addHomeWorkController, getAllHomeWork, deleteHomeWork, updateHomeWork, getHomeWork } from '../controller/hw.controller.js';

const hwRouter = Router();



hwRouter.post('/add', verifyJWT, uploadSingleMiddleware, addHomeWorkController);
hwRouter.put('/update', verifyJWT, uploadSingleMiddleware, updateHomeWork);
hwRouter.get('/all', getAllHomeWork);
hwRouter.get('/:id', getHomeWork)
hwRouter.delete('/delete', verifyJWT, deleteHomeWork);


hwRouter.get('/download/:filename', (req, res) => {
    // Get the directory name of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'File not found' });
        }
    });
});

export default hwRouter;
