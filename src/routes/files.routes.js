import { Router } from 'express';
import { filesController } from '../controllers/files.controller.js';
import { requireServiceToken } from '../middlewares/serviceToken.middleware.js';
import { uploadSingle } from '../middlewares/upload.middleware.js';

const router = Router();

router.post('/', requireServiceToken, uploadSingle, filesController.upload);

export default router;
