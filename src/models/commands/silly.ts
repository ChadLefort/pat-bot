import { ICommandParams } from '../../interfaces/index';
import * as chalk from 'chalk';
import * as _ from 'lodash';

export class Silly {
    private static instance: Silly;

    public static getInstance(): Silly {
        return this.instance || (this.instance = new Silly());
    }

    public execute(params: ICommandParams): void {
        let image = _.find(params.images, { fileName: params.processedCommand.param });

        if (image) {
            if (params.msg.content.startsWith(`${params.prefix}silly ${image.fileName}`)) {
                params.msg.channel.sendFile(`./assets/${image.fileName}.${image.ext}`)
                    .catch(error => params.logger.error(chalk.red.bold(error)));
            }
        }
    }
}
