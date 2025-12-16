import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { assetsRepository } from '../repositories/assets.repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toAbsolutePath = (storedPath) => {
  // storedPath peut être relatif ("uploads/musics/...") ou absolu
  return path.isAbsolute(storedPath)
    ? storedPath
    : path.join(__dirname, '..', '..', storedPath);
};

const toResponse = (asset) => ({
  id: asset.id,
  scope: asset.scope,
  path: asset.path,
  originalName: asset.originalName,
  mimeType: asset.mimeType,
  size: asset.size,
  createdAt: asset.createdAt,
  updatedAt: asset.updatedAt,
  url: `/api/files/${asset.id}/download`,
});

// PARLER de la notion d'asset ID
export const filesService = {
  async createAsset(data) {
    const created = await assetsRepository.create({
      scope: data.scope || 'misc',
      path: data.path,
      originalName: data.originalName,
      mimeType: data.mimeType,
      size: data.size,
    });

    return toResponse(created);
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
    const absolutePath = toAbsolutePath(asset.path);
    return { asset, absolutePath };
  },

  async updateAssetFile(id, data) {
    const asset = await this.getAsset(id);

    const oldAbsolutePath = toAbsolutePath(asset.path);

    // On met à jour l’asset en DB
    const updated = await assetsRepository.updateById(id, {
      // on garde le scope existant (ou tu peux autoriser data.scope)
      path: data.path ?? asset.path,
      originalName: data.originalName ?? asset.originalName,
      mimeType: data.mimeType ?? asset.mimeType,
      size: data.size ?? asset.size,
    });

    // Best effort: supprimer l'ancien fichier
    try {
      await fs.unlink(oldAbsolutePath);
    } catch (e) {
      console.warn('Could not delete old file:', e.message);
    }

    return toResponse(updated);
  },

  async deleteAsset(id) {
    const asset = await this.getAsset(id);
    const absolutePath = toAbsolutePath(asset.path);

    try {
      await fs.unlink(absolutePath);
    } catch (e) {
      console.warn('Could not delete file:', e.message);
    }

    await assetsRepository.deleteById(id);
    return { message: 'File deleted', id };
  },
};
