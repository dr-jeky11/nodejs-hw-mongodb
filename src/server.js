import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(cors());

  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Home page!',
    });
  });

  app.use(router);

  app.use(errorHandler);

  app.use(notFound);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};

export default setupServer;
