import { config } from 'dotenv';
import * as fs from 'fs';
import * as winston from 'winston';

export default class Config {
    private static instance: Config;
    public prefix: string;
    public token: string;
    public logger: winston.LoggerInstance;

    private constructor() {
        config();

        this.prefix = '!';
        this.token = process.env.DISCORD_TOKEN;
        this.logger = this.getLogger();
    }

    public static getInstance(): Config {
        return this.instance || (this.instance = new Config());
    }

    public getLogger(): winston.LoggerInstance {
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
