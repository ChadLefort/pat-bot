import { config } from 'dotenv';
import * as fs from 'fs';
import * as winston from 'winston';

export default class Config {
    constructor() {
        config();
    }

    public logger(): winston.LoggerInstance {
        const env = process.env.NODE_ENV || 'development';
        const logDir = 'log';
        const tsFormat = () => (new Date()).toLocaleTimeString();
        const logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: 'info',
                    timestamp: tsFormat,
                }),
                new (winston.transports.File)({
                    filename: `${logDir}/results.log`,
                    handleExceptions: true,
                    humanReadableUnhandledException: true,
                    level: env === 'development' ? 'debug' : 'info',
                    timestamp: tsFormat,
                }),
            ],
        });

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        return logger;
    }
}
