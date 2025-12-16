import path from 'path';
import { filesService } from '../services/files.service.js';

const normalizePath = (p) => p.split(path.sep).join('/');

export const filesController = {
  upload: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file provided.' });
      }

      const normalizedPath = normalizePath(req.file.path);

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
      return next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({ message: 'No file provided.' });
      }

      const normalizedPath = normalizePath(req.file.path);

      const updated = await filesService.updateAssetFile(id, {
        path: normalizedPath,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      });

      return res.status(200).json(updated);
    } catch (e) {
      return next(e);
    }
  },
};
