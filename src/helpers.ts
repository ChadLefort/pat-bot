import { ICommandParams } from './interfaces';
import Config from './models/config';
import * as chalk from 'chalk';
import * as _ from 'lodash';

export function getImage(params: ICommandParams) {
    let prefix = Config.getInstance().prefix;
    let logger = Config.getInstance().logger;
    let image = _.find(params.images, { fileName: params.processedCommand.parameter });

    if (image) {
        if (params.msg.content.startsWith(`${prefix}${image.folder} ${image.fileName}`)) {
            params.msg.channel.sendFile(`./assets/img/${image.folder}/${image.fileName}.${image.ext}`)
                .catch(error => logger.error(chalk.red.bold(error)));
        }
    }
}
