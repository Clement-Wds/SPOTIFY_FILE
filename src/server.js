import { createApp } from './app.js';
import { env } from './config/env.js';
import { initDb, sequelize } from './config/db.js';
import './models/asset.model.js';

const bootstrap = async () => {
    await initDb();

    const app = createApp();

    app.listen(env.port, () => {
    console.log(`Auth service running on port ${env.port}`);
    });

    //await sequelize.sync();
};

bootstrap();
