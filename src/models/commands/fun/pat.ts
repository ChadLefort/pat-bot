import { getImage } from '../../../helpers';
import * as Interface from '../../../interfaces';
import Commands from '../../commands';
import Config from '../../config';
import * as _ from 'lodash';

export class Pat implements Interface.ICommand {
    private static instance: Pat;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;
    private images: Array<Interface.IImage> = [];

    public static getInstance(): Pat {
        return this.instance || (this.instance = new Pat());
    }

    public execute(params: Interface.ICommandParameters): void {
        try {
            this.images = _.filter(Commands.getInstance().images, { folder: 'pat' });

            if (_.isNull(params.processedCommand.parameter)) {
                params.msg.channel.sendMessage('Meow!');
            } else {
                switch (params.processedCommand.parameter) {
                    case _.find(this.images, { fileName: params.processedCommand.parameter }).fileName:
                        getImage(params);
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(images: Array<Interface.IImage>): Promise<Interface.ICommands> {
        this.commandDetails = [{
            command: 'pat',
            description: 'Meow!!!',
        }];

        _.forEach(_.filter(images, { folder: 'pat' }), (image: Interface.IImage) => {
            this.commandDetails.push(
                {
                    command: image.folder,
                    description: 'An image of Pat!',
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
