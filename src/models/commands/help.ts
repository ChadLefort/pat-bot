import { ICommand, ICommands, ICommandDetail, ICommandParameters } from '../../interfaces/index';
// import Commands from '../../models/commands';
import Config from '../../models/config';
// import * as _ from 'lodash';

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
            // let commandDetails = await Commands.getInstance().getCommandDetails();
            // let filtered = _.union(
            //     this.commandDetails,
            //     _.filter(commandDetails, commandDetail => {
            //         if (_.includes(commandDetail.parameters, 'help')
            //             || _.includes(commandDetail.parameters, 'search term')) {
            //             return commandDetail;
            //         }
            //     })
            // );

            // _.forEach(commandDetails, commandDetail => {
            //     if (_.isUndefined(commandDetail.parameters)) {
            //         help.push(`command: ${commandDetail.command}`);
            //     } else {
            //         _.forEach(commandDetail.parameters, parameter => {
            //             help.push(`command: ${commandDetail.command} ${parameter}`);
            //         });
            //     }
            // });

            params.msg.author.sendMessage('```' + help.join('\n') + '```');
        } catch (error) {
            this.logger.error(error);
        }
    }

    public getCommands(): ICommands {
        this.commandDetails = [{
            command: 'help',
            description: 'List all commands.',
            parameters: ['all'],
        }];

        return {
            category: 'help',
            commandDetails: this.commandDetails,
        };
    }
}
