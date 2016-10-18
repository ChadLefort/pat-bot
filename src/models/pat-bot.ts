import { getClassName } from '../helpers';
import * as Interface from '../interfaces';
import Commands from './commands';
import Config from './config';
import InstanceLoader from './instance-loader';
import * as Discord from 'discord.js';
import * as _ from 'lodash';

export default class PatBot {
    private prefix = Config.getInstance().prefix;
    private logger = Config.getInstance().logger;
    private client: Discord.Client;
    private mainCommands: Array<Interface.ICommandAndCategory> = [];

    constructor(private token: string) {
        this.client = new Discord.Client();
        this.client.login(this.token);
    }

    public async execute(): Promise<void> {
        try {
            this.mainCommands = await Commands.getInstance().getMainCommands();
        } catch (error) {
            this.logger.error(error);
        }

        this.client.on('ready', () => {
            this.logger.info('Meow! I am ready for commands!');
        });

        this.client.on('message', msg => {
            this.handleCommand(msg);
        });

        this.client.on('error', error => {
            this.logger.error(error.message);
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

        let params: Interface.ICommandParameters = {
            msg: msg,
            processedCommand: processedCommand,
        };

        InstanceLoader.getInstance<Interface.ICommand>(processedCommand.className).execute(params);
    }

    private processCommand(msg: string): Interface.IProssedCommand {
        let [command, ...parameter] = _.chain(msg).replace('!', '').split(' ').value();
        let parameterJoin = _.join(parameter, ' ');
        let mainCommand = _.find(this.mainCommands, { command: command });

        return {
            className: getClassName(command),
            command: !_.isUndefined(mainCommand) ? mainCommand.command : undefined,
            parameter: _.isEmpty(parameterJoin) ? null : parameterJoin,
        };
    }
}
