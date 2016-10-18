import { validateParameter } from '../../../helpers';
import * as Interface from '../../../interfaces';
import Commands from '../../models/../commands';
import Config from '../../models/../config';
import * as _ from 'lodash';

export class Help implements Interface.ICommand {
    private static instance: Help;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;
    private mainCommands: Array<Interface.ICommandAndCategory>;

    public static getInstance(): Help {
        return this.instance || (this.instance = new Help());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            await this.getCategories();
            let help: Array<string> = [];
            let commandsGrouped = await Commands.getInstance().getCommandsGrouped();
            let filtered = _.filter(commandsGrouped, { category: params.processedCommand.parameter });

            if (validateParameter(commandsGrouped, 'help', params)) {
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
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public getCommands(): Interface.ICommands {
        this.commandDetails = [{
            command: 'help',
            description: 'List all commands.',
            parameters: ['all'],
        }];

        _.chain(this.mainCommands).map('category').uniq().value().forEach(category => {
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

    private async getCategories(): Promise<void> {
        try {
            this.mainCommands = await Commands.getInstance().getMainCommands();
        } catch (error) {
            this.logger.error(error);
        }
    }
}
