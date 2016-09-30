import * as Interface from '../interfaces/index';
import Commands from './commands';
import * as Promise from 'bluebird';
import * as chalk from 'chalk';
import * as Discord from 'discord.js';
import * as glob from 'glob';
import * as _ from 'lodash';
import * as winston from 'winston';

export default class PatBot {
    private images: Array<Interface.IImage> = [];
    private client: Discord.Client;
    private prefix: string = '!';
    private commands: Interface.ICommands;
    private commandInfo: Array<Interface.ICommandInfo> = [];

    constructor(private token: string, private logger: winston.LoggerInstance) {
        this.client = new Discord.Client();
        this.client.login(this.token);
        this.commands = Commands.getInstance().commands;
    }

    public execute(): void {
        this.getImages().then(data => {
            this.images = data;
            this.commandInfo = Commands.getInstance().getCommandInfo(this.prefix, this.images);
        });

        this.client.on('ready', () => {
            this.logger.info(chalk.green.bold('Meow! I am ready for commands!'));
        });

        this.client.on('message', msg => {
            this.handleCommand(msg);
        });
    }

    private handleCommand(msg: Discord.Message): void {
        if (!msg.content.startsWith(this.prefix) || msg.author.bot) {
            return;
        }

        let processedCommand = this.processCommand(msg);

        if (!processedCommand.command) {
            return;
        }

        let params: Interface.ICommandParams = {
            logger: this.logger,
            msg: msg,
            prefix: this.prefix,
            processedCommand: processedCommand,
        };

        console.log(params.processedCommand);

        switch (processedCommand.command.command) {
            case `${this.prefix}help`:
                params.commandInfo = this.commandInfo;
                this.commands.help.execute(params);
                break;
            case `${this.prefix}silly`:
                params.images = this.images;
                this.commands.silly.execute(params);
                break;
            case `${this.prefix}gif`:
                this.commands.gif.execute(params);
                break;
            default:
                this.commands.meow.execute(params);
        }
    }

    private processCommand(msg: Discord.Message): Interface.IProssedCommand {
        let message = msg.content.substr(0, msg.content.indexOf(' ') === -1 ? msg.content.length : msg.content.indexOf(' '));

        return {
            command: _.find(this.commandInfo, { command: message }),
            param: msg.content.substr(msg.content.indexOf(' ') === -1 ? null : msg.content.indexOf(' ') + 1),
        };
    }

    private getImages(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            glob('+(*.jpg|*.png|*.gif)', { cwd: './assets/' }, (error, files) => {
                _.forEach(files, file => {
                    this.images.push({ ext: file.split('.')[1], fileName: file.split('.')[0] });
                });

                if (this.images.length >= 1) {
                    resolve(this.images);
                } else {
                    reject('There was an error getting images!');
                    this.logger.error(chalk.red.bold('There was an error getting images!'));
                }
            });
        });

        return promise;
    }
}
