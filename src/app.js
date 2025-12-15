// src/app.js
import express from 'express';
import cors from 'cors';

import filesRoutes from './routes/files.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/files', filesRoutes);

  app.use(errorHandler);

  return app;
};
