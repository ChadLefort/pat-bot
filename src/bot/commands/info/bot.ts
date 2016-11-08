import * as Interface from '../../../interfaces';
import CommandHandler from '../../command-handler';
import Config from '../../config';
import { validateParameter } from '../../helpers';
import * as moment from 'moment';

export class Bot implements Interface.ICommand {
    private static instance: Bot;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Bot {
        return this.instance || (this.instance = new Bot());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            const commandsGrouped = await CommandHandler.getInstance().getCommandsGrouped();

            if (!validateParameter(commandsGrouped, 'info', params)) {
                return;
            }

            switch (params.processedCommand.parameter) {
                case 'version':
                    params.msg.channel.sendMessage(`I'm at version ${process.env.npm_package_version}.`);
                    break;
                case 'uptime':
                    const uptime = moment.duration(process.uptime(), 'seconds');
                    params.msg.channel.sendMessage(`I have been alive for ${uptime.days()} days, ${uptime.hours()} hours, ${uptime.minutes()} minutes, and ${uptime.seconds()} seconds.`);
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        this.commandDetails = [{
            command: 'bot',
            description: 'The version of Pat Bot.',
            parameters: ['version'],
        }, {
            command: 'bot',
            description: 'The amount of time Pat Bot has been alive.',
            parameters: ['uptime'],
        }];

        return {
            category: 'info',
            commandDetails: this.commandDetails,
        };
    }
}
