import express, { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import compression from 'compression';
import { logger } from './utils';
import { PORT, NODE_ENV } from './config';
import initializeDB from './config/db';
import errorMiddleware from './middlewares/error.middleware';

interface RouteProps {
  path?: string;
  router: Router;
}

class Application {
  port: string;

  app: express.Application;

  env: string;

  constructor(routes: RouteProps[]) {
    this.app = express();
    this.port = PORT as string;
    this.env = NODE_ENV as string;
    initializeDB();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandler();
  }

  public start = () => {
    this.app.listen(this.port, () => {
      logger.info(`env::${this.env.toUpperCase()}`);
      logger.info(`Application started on port ${this.port} `);
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(hpp());
    this.app.use(compression());
  };

  private initializeRoutes(routes: RouteProps[]) {
    routes.forEach((route) => {
      this.app.use('/api', route.router);
    });
  }

  private initializeErrorHandler = () => {
    this.app.use(errorMiddleware);
  };
}

export default Application;
