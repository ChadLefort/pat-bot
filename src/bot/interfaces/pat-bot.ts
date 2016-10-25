import * as Discord from 'discord.js';

export interface IImage {
    ext: string;
    fileName: string;
    folder: string;
}

export interface ICommandParameters {
    msg: Discord.Message;
    processedCommand: IProssedCommand;
}

export interface IProssedCommand {
    className: string;
    command: string;
    parameter: string;
}
