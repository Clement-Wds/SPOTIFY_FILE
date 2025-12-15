import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  authServiceUrl : process.env.AUTH_SERVICE_URL,
  authServiceToken: process.env.AUTH_SERVICE_TOKEN,
  uploadServiceToken : process.env.UPLOAD_SERVICE_TOKEN,
  uploadDir : process.env.UPLOAD_DIR,
  uploadMaxSize : process.env.MAX_FILE_SIZE,
  db: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT || '3306',
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
