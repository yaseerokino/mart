import pino from 'pino';
import dayjs from 'dayjs';
import { LOG_LEVEL } from '../config';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  level: LOG_LEVEL || 'info',
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
