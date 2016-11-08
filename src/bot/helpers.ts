import { ICommandParameters, ICommands } from '../interfaces';
import CommandHandler from './command-handler';
import Config from './config';
import * as _ from 'lodash';

export async function getImage(params: ICommandParameters): Promise<void> {
    const prefix = Config.getInstance().prefix;
    const images = await CommandHandler.getInstance().getImages();
    const image = _.find(images, { fileName: params.processedCommand.parameter, folder: params.processedCommand.command });

    if (image) {
        if (params.msg.content.startsWith(`${prefix}${image.folder} ${image.fileName}`)) {
            params.msg.channel.sendFile(`${process.env.AWS_BUCKET_URL}/${image.folder}/${image.fileName}.${image.ext}`);
        }
    }
}

export function validateParameter(commandsGrouped: Array<ICommands>, category: string, params: ICommandParameters): boolean {
    const parameters = _.chain(commandsGrouped)
        .filter({ category })
        .map(value => _.map(value.commandDetails, 'parameters'))
        .flattenDeep()
        .value();

    if (_.includes(parameters, params.processedCommand.parameter) || _.isNull(params.processedCommand.parameter)) {
        return true;
    } else {
        return false;
    }
}

export function getClassName(command: string): string {
    return _.chain(_.split(command, '-')).map((value: string) => _.capitalize(value)).join('').value();
}
