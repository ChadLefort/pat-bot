import { ICommandInfo } from './commands';
import * as Discord from 'discord.js';
import * as winston from 'winston';

export interface IImage {
    ext: string;
    fileName: string;
}

export interface ICommandParams {
    prefix: string;
    msg: Discord.Message;
    logger: winston.LoggerInstance;
    processedCommand: IProssedCommand;
    commandInfo?: Array<ICommandInfo>;
    images?: Array<IImage>;
}

export interface IProssedCommand {
    command: ICommandInfo;
    param: string;
}
