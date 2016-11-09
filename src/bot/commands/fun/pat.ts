import Config from '../../../config';
import * as Interface from '../../../interfaces';
import CommandHandler from '../../command-handler';
import { getImage, validateParameter } from '../../helpers';
import * as _ from 'lodash';

export class Pat implements Interface.ICommand {
    private static instance: Pat;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Pat {
        return this.instance || (this.instance = new Pat());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            const commandsGrouped = await CommandHandler.getInstance().getCommandsGrouped();

            if (!validateParameter(commandsGrouped, 'fun', params)) {
                return;
            }

            if (_.isNull(params.processedCommand.parameter)) {
                params.msg.channel.sendMessage('Meow!');
            } else {
                getImage(params);
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        const images = await CommandHandler.getInstance().getImages();

        this.commandDetails = [{
            command: 'pat',
            description: 'She meows.',
        }];

        _.forEach(_.filter(images, { folder: 'pat' }), (image: Interface.IImage) => {
            this.commandDetails.push(
                {
                    command: image.folder,
                    description: 'An image of Pat.',
                    parameters: [image.fileName],
                }
            );
        });

        return {
            category: 'fun',
            commandDetails: this.commandDetails,
        };
    }
}
