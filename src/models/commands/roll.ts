import { ICommand, ICommands, ICommandDetail, ICommandParameters } from '../../interfaces';
import * as _ from 'lodash';

export class Roll implements ICommand {
    private static instance: Roll;
    private commandDetails: Array<ICommandDetail>;

    public static getInstance(): Roll {
        return this.instance || (this.instance = new Roll());
    }

    public execute(params: ICommandParameters): void {
        let maxRoll = 100;
        let parameter = parseInt(params.processedCommand.parameter, 10);

        if (_.isNumber(parameter) && parameter > 1) {
            maxRoll = parameter;
        }

        params.msg.channel.sendMessage(_.random(1, maxRoll));
    }

    public getCommands(): ICommands {
        this.commandDetails = [{
            command: 'roll',
            description: 'Roll a random number between 1 and 100!',
        }, {
            command: 'roll',
            description: 'Roll a random number between 1 and a number of your choosing!',
            parameters: ['number'],
        }];

        return {
            category: 'other',
            commandDetails: this.commandDetails,
        };
    }
}
