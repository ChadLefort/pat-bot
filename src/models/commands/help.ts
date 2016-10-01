import { ICommandDetail, ICommandParams } from '../../interfaces/index';
import * as _ from 'lodash';

export class Help {
    private static instance: Help;
    private commandDetails: Array<ICommandDetail>;

    public static getInstance(): Help {
        return this.instance || (this.instance = new Help());
    }

    public execute(params: ICommandParams): void {
        let help: Array<string> = [];

        _.forEach(params.commandDetails, commandDetail => {
            if (_.isUndefined(commandDetail.parameters)) {
                help.push(`command: ${commandDetail.command}, description: ${commandDetail.description}`);
            } else {
                _.forEach(commandDetail.parameters, parameter => {
                    help.push(`command: ${commandDetail.command} ${parameter}, description: ${commandDetail.description}`);
                });
            }
        });

        params.msg.author.sendMessage('```' + help.join('\n') + '```');
    }

    public getCommandDetails(): Array<ICommandDetail> {
        this.commandDetails = [{
            command: 'help',
            description: 'List all commands.',
        }];

        return this.commandDetails;
    }
}
