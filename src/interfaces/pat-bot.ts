import { ICommandDetail } from './commands';
import * as Discord from 'discord.js';

export interface IImage {
    ext: string;
    fileName: string;
    folder: string;
}

export interface ICommandParams {
    msg: Discord.Message;
    processedCommand: IProssedCommand;
    commandDetails: Array<ICommandDetail>;
    images: Array<IImage>;
}

export interface IProssedCommand {
    className: string;
    command: string;
    parameter: string;
}
