import { config } from 'dotenv';
import * as fs from 'fs';
import * as pm2 from 'pm2';
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
        const logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: env === 'development' ? 'debug' : 'info',
                    timestamp: () => (new Date()).toLocaleTimeString(),
                }),
                new (winston.transports.File)({
                    filename: `${logDir}/winston.log`,
                    handleExceptions: true,
                    humanReadableUnhandledException: true,
                    json: false,
                    level: env === 'development' ? 'debug' : 'info',
                    timestamp: 'YYYY-MM-DD HH:mm Z',
                }),
            ],
        });

        this.mkDir(logDir);

        return logger;
    }

    public startPM2() {
        let maxMemory = process.env.WEB_MEMORY || 256;
        const logDir = 'log';

        pm2.connect(() => {
            pm2.start({
                env: { NODE_ENV: process.env.NODE_ENV },
                exec_mode: 'cluster',
                log_date_fomrat: 'YYYY-MM-DD HH:mm Z',
                log_file: `${logDir}/pm2.log`,
                max_memory_restart: maxMemory + 'M',
                merge_logs: true,
                name: 'pat-bot',
                script: 'lib/index.js',
            }, () => {
                pm2.interact(process.env.KEYMETRICS_PRIVATE, process.env.KEYMETRICS_PUBLIC, 'dokku');
            });
        });

        this.mkDir(logDir);
    }

    private mkDir(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
}
