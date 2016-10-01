import { ICommandParams } from './interfaces';
import * as chalk from 'chalk';
import * as _ from 'lodash';

export function getImage(params: ICommandParams) {
    let image = _.find(params.images, { fileName: params.processedCommand.param });

    if (image) {
        if (params.msg.content.startsWith(`${params.prefix}${image.folder} ${image.fileName}`)) {
            params.msg.channel.sendFile(`./assets/img/${image.folder}/${image.fileName}.${image.ext}`)
                .catch(error => params.logger.error(chalk.red.bold(error)));
        }
    }
}

export function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
