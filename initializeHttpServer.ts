import { version } from './package.json';
import http from 'http';
import express from 'express';
import { logger } from '@configs/logger.config';
import { corsMiddleware } from '@middlewares/cors.middleware';
import { cookiePareserMiddleware } from '@middlewares/cookieParser.middleware';
import { initializeApolloServer } from './initializeApolloServer';
import { initializeConnectionToMongoDB } from './initializeConnectionToMongoDB';

const { PORT } = process.env;

const initializeHttpServer = async () => {
  let httpServer: http.Server | undefined;

  try {
    logger.info('Initializing HTTP server...');

    if (PORT === undefined) {
      throw new Error('Missing environment variable!');
    }

    const expressApp = express();

    expressApp.use(express.json());
    expressApp.use(corsMiddleware());
    expressApp.use(cookiePareserMiddleware());

    expressApp.use('/api', (req, _, next) => {
      req.logger = logger;
      logger.info(`${req.method} api${req.path} - ${req.ip}`);

      return next();
    });

    expressApp.get('/api/version', (_, res) => {
      return res.status(200).json({ version });
    });

    expressApp.get('/api/health', (_, res) => {
      return res.status(200).json({ message: 'Ok' });
    });

    httpServer = http.createServer(expressApp);

    await initializeConnectionToMongoDB();
    await initializeApolloServer({ httpServer, expressApp });

    httpServer.listen(PORT, async () => {
      logger.info(
        `Initialized HTTP server, HTTP server is listening at port ${PORT}!`,
      );
    });
  } catch (error) {
    logger.error('An error occurred when initializing HTTP server!', {
      error,
    });

    if (httpServer) {
      logger.info('Closing HTTP server...');

      httpServer.close(() => {
        logger.info('Closed HTTP server!');

        process.exit(1);
      });
    }
  }
};

export { initializeHttpServer };
