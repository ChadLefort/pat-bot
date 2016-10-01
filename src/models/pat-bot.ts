import * as Interface from '../interfaces';
import Commands from './commands';
import * as Promise from 'bluebird';
import * as chalk from 'chalk';
import * as Discord from 'discord.js';
import * as glob from 'glob';
import * as _ from 'lodash';
import * as path from 'path';
import * as winston from 'winston';

export default class PatBot {
    private images: Array<Interface.IImage> = [];
    private client: Discord.Client;
    private prefix: string = '!';
    private mainCommands: Interface.IMainCommands;
    private commandDetails: Array<Interface.ICommandDetail> = [];

    constructor(private token: string, private logger: winston.LoggerInstance) {
        this.client = new Discord.Client();
        this.client.login(this.token);
        this.mainCommands = Commands.getInstance().mainCommands;
    }

    public execute(): void {
        this.getImages().then(data => {
            this.images = data;
            this.commandDetails = Commands.getInstance().getCommandDetails(this.prefix, this.images);
        });

        this.getMainCommands().then(data => {
            console.log(data);
        });

        this.client.on('ready', () => {
            this.logger.info(chalk.green.bold('Meow! I am ready for commands!'));
        });

        this.client.on('message', msg => {
            this.handleCommand(msg);
        });

        this.client.on('error', error => {
            this.logger.error(chalk.red.bold(error.message));
        });
    }

    private handleCommand(msg: Discord.Message): void {
        if (!msg.content.startsWith(this.prefix) || msg.author.bot) {
            return;
        }

        msg.content = msg.content.toLowerCase();
        let processedCommand = this.processCommand(msg.content);

        if (!processedCommand.command) {
            return;
        }

        let params: Interface.ICommandParams = {
            logger: this.logger,
            msg: msg,
            prefix: this.prefix,
            processedCommand: processedCommand,
        };

        switch (processedCommand.command) {
            case `${this.prefix}help`:
                params.commandDetails = this.commandDetails;
                this.mainCommands.help.execute(params);
                break;
            case `${this.prefix}silly`:
                params.images = this.images;
                this.mainCommands.silly.execute(params);
                break;
            case `${this.prefix}gif`:
                this.mainCommands.gif.execute(params);
                break;
            default:
                params.images = this.images;
                this.mainCommands.pat.execute(params);
        }
    }

    private processCommand(msg: string): Interface.IProssedCommand {
        let message = msg.substr(0, msg.indexOf(' ') === -1 ? msg.length : msg.indexOf(' '));

        return {
            command: _.find(this.commandDetails, { command: message }).command,
            param: msg.substr(msg.indexOf(' ') === -1 ? null : msg.indexOf(' ') + 1),
        };
    }

    private getImages(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            glob('**/*+(*.jpg|*.png|*.gif)', { cwd: './assets/img/' }, (error, files) => {
                _.forEach(files, file => {
                    let filePath = file.split('.')[0].split('/');
                    this.images.push({ ext: file.split('.')[1], fileName: filePath[1], folder: filePath[0] });
                });

                if (error) {
                    reject(error);
                    this.logger.error(chalk.red.bold(error.message));
                } else {
                    resolve(this.images);
                }
            });
        });

        return promise;
    }

    private getMainCommands(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            glob('**/*.ts', { cwd: './src/models/commands/' }, (error, files) => {
                let mainCommands: Array<string> = [];

                _.forEach(files, file => {
                    mainCommands.push(path.basename(file, path.extname(file)));
                });

                if (error) {
                    reject(error);
                    this.logger.error(chalk.red.bold(error.message));
                } else {
                    resolve(mainCommands);
                }
            });
        });

        return promise;
    }
}
