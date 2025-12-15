import { Asset } from '../models/asset.model.js';

export const assetsRepository = {
  create(data) {
    return Asset.create(data);
  },

  findById(id) {
    return Asset.findByPk(id);
  },

  async deleteById(id) {
    const asset = await Asset.findByPk(id);
    if (!asset) return null;
    await asset.destroy();
    return asset;
  },
};
