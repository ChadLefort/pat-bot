import { getImage } from '../../helpers';
import { ICommand, ICommandDetail, ICommandParameters, IImage } from '../../interfaces';
import Config from '../config';
import * as _ from 'lodash';

export class Pat implements ICommand {
    private static instance: Pat;
    private prefix = Config.getInstance().prefix;
    private commandDetails: Array<ICommandDetail>;

    public static getInstance(): Pat {
        return this.instance || (this.instance = new Pat());
    }

    public execute(params: ICommandParameters): void {
        let meow = ['pat'].map(cmd => this.prefix + cmd);

        if (_.includes(meow, params.msg.content)) {
            params.msg.channel.sendMessage('Meow!!!');
        } else {
            getImage(params);
        }
    }

    public getCommandDetails(images: Array<IImage>): Array<ICommandDetail> {
        this.commandDetails = [{
            command: 'pat',
            description: 'Meow!!!',
        }];

        _.forEach(images, (image: IImage) => {
            this.commandDetails.push(
                {
                    command: image.folder,
                    description: 'A cute image of Pat!',
                    parameters: [image.fileName],
                }
            );
        });

        return this.commandDetails;
    }
}
