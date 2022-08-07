import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import compression from 'compression';
import { readdirSync } from 'fs';
import { logger } from './utils';
import { PORT, NODE_ENV } from './config';
import initializeDB from './config/db';

const app = express();
const port = PORT;
const env = NODE_ENV as string;

initializeDB();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(hpp());
app.use(compression());

readdirSync('./src/routes').map((route) => app.use('/api', require(`./routes/${route}`)));

app.listen(port, () => {
  logger.info(`env::${env.toUpperCase()}`);
  logger.info(`Application started on port ${port} `);
});

export default app;
