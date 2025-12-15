import path from 'path';
import { filesService } from '../services/files.service.js';

export const filesController = {
  upload: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file provided.' });
      }

      // important : renvoyer un chemin relatif "stable" (pas un chemin Windows absolu)
      // req.file.path peut être "uploads\\musics\\..." sous Windows
      // L'objectif est de retourner un path normalisé
      const normalizedPath = req.file.path.split(path.sep).join('/');

      const folder = (req.body.folder || 'misc').replace(/[^a-zA-Z0-9_-]/g, '');

      const asset = await filesService.createAsset({
        scope: folder,
        path: normalizedPath,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      });

      return res.status(201).json(asset);
    } catch (e) {
      next(e);
    }
  },
};
