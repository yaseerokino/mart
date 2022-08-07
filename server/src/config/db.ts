import mongoose from 'mongoose';
import { DB_URI } from '.';
import { logger } from '../utils';

const initializeDB = async () => {
  try {
    await mongoose.connect(DB_URI as string);

    logger.info('Database connected');
  } catch (error) {
    process.exit(1);
  }
};

export default initializeDB;
