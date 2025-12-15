import { env } from '../config/env.js';

export const requireServiceToken = (req, res, next) => {
  const token = req.headers['x-service-token'];

  if (!token || token !== env.uploadServiceToken) {
    return res.status(403).json({ message: 'Forbidden: invalid service token.' });
  }

  next();
};
