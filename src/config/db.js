import { Sequelize } from 'sequelize';
import { env } from './env.js';

export const sequelize = new Sequelize(
  env.db.dbName,
  env.db.dbUser,
  env.db.dbPassword,
  {
    host: env.db.dbHost,
    port: Number(env.db.dbPort),
    dialect: 'mysql',
  }
);

export async function initDb() {
  await sequelize.authenticate();
}
