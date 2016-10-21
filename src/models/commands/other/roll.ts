import * as Interface from '../../../interfaces';
import Config from '../../models/../config';
import * as _ from 'lodash';

export class Roll implements Interface.ICommand {
    private static instance: Roll;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Roll {
        return this.instance || (this.instance = new Roll());
    }

    public execute(params: Interface.ICommandParameters): void {
        try {
            const parameter = parseInt(params.processedCommand.parameter, 10);
            let maxRoll = 100;

            if (_.isNumber(parameter) && parameter > 1) {
                maxRoll = parameter;
            }

            params.msg.channel.sendMessage(_.random(1, maxRoll));
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        this.commandDetails = [{
            command: 'roll',
            description: 'Roll a random number between 1 and 100.',
        }, {
            command: 'roll',
            description: 'Roll a random number between 1 and a number of your choosing.',
            parameters: ['number'],
        }];

        return {
            category: 'other',
            commandDetails: this.commandDetails,
        };
    }
}
