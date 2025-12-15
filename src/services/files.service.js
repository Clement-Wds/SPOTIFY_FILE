import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { assetsRepository } from '../repositories/assets.repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//PARLER de la notion d'asset ID
export const filesService = {
  async createAsset(data) {
    const created = await assetsRepository.create({
      scope: data.scope || 'misc',
      path: data.path,
      originalName: data.originalName,
      mimeType: data.mimeType,
      size: data.size,
    });

    return {
      id: created.id,
      scope: created.scope,
      path: created.path,
      originalName: created.originalName,
      mimeType: created.mimeType,
      size: created.size,
      createdAt: created.createdAt,
      url: `/api/files/${created.id}/download`,
    };
  },

  async getAsset(id) {
    const asset = await assetsRepository.findById(id);
    if (!asset) {
      const err = new Error('File not found');
      err.statusCode = 404;
      throw err;
    }
    return asset;
  },

  async getAssetFile(id) {
    const asset = await this.getAsset(id);
    const absolutePath = path.isAbsolute(asset.path)
      ? asset.path
      : path.join(__dirname, '..', '..', asset.path);

    return { asset, absolutePath };
  },

  async deleteAsset(id) {
    const asset = await this.getAsset(id);

    try {
      await fs.unlink(asset.path);
    } catch (e) {
      console.warn('Could not delete file:', e.message);
    }

    await assetsRepository.deleteById(id);
    return { message: 'File deleted', id };
  },
};
