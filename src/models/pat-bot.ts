import * as Interface from '../interfaces';
import Commands from './commands';
import Config from './config';
import InstanceLoader from './instance-loader';
import * as Promise from 'bluebird';
import * as chalk from 'chalk';
import * as Discord from 'discord.js';
import * as glob from 'glob';
import * as _ from 'lodash';

export default class PatBot {
    private prefix = Config.getInstance().prefix;
    private logger = Config.getInstance().logger;
    private client: Discord.Client;
    private images: Array<Interface.IImage> = [];
    private commandDetails: Array<Interface.ICommandDetail> = [];
    private mainCommands: Array<string> = [];

    constructor(private token: string) {
        this.client = new Discord.Client();
        this.client.login(this.token);
    }

    public execute(): void {
        Commands.getInstance().getMainCommands().then(mainCommands => {
            this.mainCommands = mainCommands;
        });

        this.getImages().then(data => {
            this.images = data;
            return this.images;
        }).then(images => {
            Commands.getInstance().getCommandDetails(images).then(data => {
                this.commandDetails = data;
            });
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
            commandDetails: this.commandDetails,
            images: this.images,
            msg: msg,
            processedCommand: processedCommand,
        };

        console.log(processedCommand);

        InstanceLoader.getInstance<Interface.ICommand>(processedCommand.className).execute(params);
    }

    private processCommand(msg: string): Interface.IProssedCommand {
        let [command, ...parameter] = _.chain(msg).replace('!', '').split(' ').value();
        let parameterJoin = _.join(parameter, ' ');

        return {
            className: _.chain(_.split(command, '-')).map((value: string) => _.capitalize(value)).join('').value(),
            command: this.mainCommands[_.indexOf(this.mainCommands, command)],
            parameter: _.isEmpty(parameterJoin) ? null : parameterJoin,
        };
    }

    private getImages(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            glob('**/*+(*.jpg|*.png|*.gif)', { cwd: './assets/img/' }, (error, files) => {
                let images: Array<Interface.IImage> = [];

                _.forEach(files, file => {
                    let filePath = file.split('.')[0].split('/');
                    images.push({ ext: file.split('.')[1], fileName: filePath[1], folder: filePath[0] });
                });

                if (error) {
                    reject(error);
                    this.logger.error(chalk.red.bold(error.message));
                } else {
                    resolve(images);
                }
            });
        });

        return promise;
    }
}
