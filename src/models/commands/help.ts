import { ICommandParams } from '../../interfaces/index';
import * as _ from 'lodash';

export class Help {
    private static instance: Help;

    public static getInstance(): Help {
        return this.instance || (this.instance = new Help());
    }

    public execute(params: ICommandParams): void {
        let help: Array<string> = [];

        _.forEach(params.commandInfo, (command, index) => {
            if (_.isUndefined(command.param)) {
                help.push(`command: ${command.command}`);
            } else {
                help.push(`command: ${command.command}, paramater: ${command.param}`);
            }
        });

        params.msg.channel.sendMessage('```' + help.join('\n') + '```');
    }
}
