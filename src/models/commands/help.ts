import { ICommand, ICommandDetail, ICommandParameters } from '../../interfaces/index';
import Commands from '../../models/commands';
import Config from '../../models/config';
import * as _ from 'lodash';

export class Help implements ICommand {
    private static instance: Help;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<ICommandDetail>;

    public static getInstance(): Help {
        return this.instance || (this.instance = new Help());
    }

    public async execute(params: ICommandParameters): Promise<void> {
        try {
            let help: Array<string> = [];
            let commandDetails = await Commands.getInstance().getCommandDetails();

            _.forEach(commandDetails, commandDetail => {
                if (_.isUndefined(commandDetail.parameters)) {
                    help.push(`command: ${commandDetail.command}, description: ${commandDetail.description}`);
                } else {
                    _.forEach(commandDetail.parameters, parameter => {
                        help.push(`command: ${commandDetail.command} ${parameter}, description: ${commandDetail.description}`);
                    });
                }
            });

            params.msg.author.sendMessage('```' + help.join('\n') + '```');
        } catch (error) {
            this.logger.error(error);
        }
    }

    public getCommandDetails(): Array<ICommandDetail> {
        this.commandDetails = [{
            command: 'help',
            description: 'List all commands.',
        }];

        return this.commandDetails;
    }
}
