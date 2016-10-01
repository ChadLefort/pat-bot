import { ICommandDetail } from './commands';
import * as Discord from 'discord.js';
import * as winston from 'winston';

export interface IImage {
    ext: string;
    fileName: string;
    folder: string;
}

export interface ICommandParams {
    prefix: string;
    msg: Discord.Message;
    logger: winston.LoggerInstance;
    processedCommand: IProssedCommand;
    commandDetails?: Array<ICommandDetail>;
    images?: Array<IImage>;
}

export interface IProssedCommand {
    command: string;
    param: string;
}
