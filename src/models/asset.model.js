import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Asset = sequelize.define(
  'Asset',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    scope: {
      type: DataTypes.STRING(50), //Musics, Cover, Avatar
      allowNull: false,
      defaultValue: 'misc',
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mimeType: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    size: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: 'assets',
    timestamps: true,
  }
);
