import mongoose from 'mongoose';
import { logger } from '@configs/logger.config';

const { MONGODB_URI } = process.env;

const initializeConnectionToMongoDB = async () => {
  logger.info('Initializing connection to MongoDB...');

  if (MONGODB_URI === undefined) {
    logger.error('An error occurred when initializing connection to MongoDB!');
    throw new Error('Missing environment variable!');
  }

  await mongoose.connect(MONGODB_URI);
  logger.info('Initialized connection to MongoDB!');
};

export { initializeConnectionToMongoDB };
