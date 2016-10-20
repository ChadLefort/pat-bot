import { validateParameter } from '../../../helpers';
import * as Interface from '../../../interfaces';
import Commands from '../../models/../commands';
import Config from '../../models/../config';
import * as _ from 'lodash';

export class Help implements Interface.ICommand {
    private static instance: Help;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Help {
        return this.instance || (this.instance = new Help());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            const commandsGrouped = await Commands.getInstance().getCommandsGrouped();
            let filtered = _.filter(commandsGrouped, { category: params.processedCommand.parameter });
            let help: Array<string> = [];

            if (!validateParameter(commandsGrouped, 'help', params)) {
                return;
            }

            if (_.isNull(params.processedCommand.parameter)) {
                filtered = _.filter(commandsGrouped, { category: 'help' });
            }

            _.forEach(filtered, value => {
                _.forEach(value.commandDetails, commandDetail => {
                    if (_.isUndefined(commandDetail.parameters)) {
                        help.push(`command: ${commandDetail.command}`);
                    } else {
                        _.forEach(commandDetail.parameters, parameter => {
                            help.push(`command: ${commandDetail.command} ${parameter}`);
                        });
                    }
                });
            });

            params.msg.channel.sendMessage('```' + help.join('\n') + '```');
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        const mainCommands = await Commands.getInstance().getMainCommands();

        this.commandDetails = [{
            command: 'help',
            description: 'List all commands.',
            parameters: ['all'],
        }];

        _.chain(mainCommands).map('category').uniq().value().forEach(category => {
            this.commandDetails.push(
                {
                    command: 'help',
                    description: `All of the commands in the ${category} category.`,
                    parameters: [<string>category],
                }
            );
        });

        return {
            category: 'help',
            commandDetails: this.commandDetails,
        };
    }
}
