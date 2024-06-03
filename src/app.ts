import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import "reflect-metadata";
import { DataSource } from 'typeorm';
import { appConfig } from './config/app.config';
import { dataSource } from './config/orm.config';
import { Routes } from './interfaces/routes.interface';
import { errorHandler, notFoundErrorHandler } from './middlewares/error.handler.middleware';
import { requestLogging } from './middlewares/logging.middleware';
import { authenticateToken } from './security/webconfig.security';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        dotenv.config();
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = appConfig.port || 3007;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeSecurity();
        this.initializeRequestLogger();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log(`=================================`);
        });
    }

    private connectToDatabase() {
        this.createConnection(dataSource);
    }

    private createConnection(datasource: DataSource) {
        datasource
            .initialize()
            .then(() => {
                console.log('Connected to database!');
            })
            .catch((err: Error) => {
                console.log(
                    'Error in establishing connection with the database..',
                    err
                );
            });
    }

    private initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(morgan('short'));
        this.app.use(cors());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/api', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(notFoundErrorHandler);
        this.app.use(errorHandler);
    }

    private initializeRequestLogger() {
        this.app.use(requestLogging);
    }

    private initializeSecurity() {
        this.app.use(authenticateToken);
    }
}

export default App;
