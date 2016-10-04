import { ICommandParameters } from './interfaces';
import Commands from './models/commands';
import Config from './models/config';
import * as _ from 'lodash';

export async function getImage(params: ICommandParameters): Promise<void> {
    let prefix = Config.getInstance().prefix;
    let logger = Config.getInstance().logger;
    let images = Commands.getInstance().images;
    let image = _.find(images, { fileName: params.processedCommand.parameter });

    if (image) {
        if (params.msg.content.startsWith(`${prefix}${image.folder} ${image.fileName}`)) {
            try {
                await params.msg.channel.sendFile(`./assets/img/${image.folder}/${image.fileName}.${image.ext}`);
            } catch (error) {
                logger.error(error);
            }
        }
    }
}
