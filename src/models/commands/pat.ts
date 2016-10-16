import { getImage } from '../../helpers';
import { ICommand, ICommandCategory, ICommandDetail, ICommandParameters, IImage } from '../../interfaces';
import Commands from '../commands';
import Config from '../config';
import * as _ from 'lodash';

export class Pat implements ICommand {
    private static instance: Pat;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<ICommandDetail>;
    private images: Array<IImage> = [];

    public static getInstance(): Pat {
        return this.instance || (this.instance = new Pat());
    }

    public execute(params: ICommandParameters): void {
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

    public getCommandDetails(images: Array<IImage>): ICommandCategory {
        this.commandDetails = [{
            command: 'pat',
            description: 'Meow!!!',
        }];

        _.forEach(images, (image: IImage) => {
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
