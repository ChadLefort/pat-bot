import { ICommandParameters, IImage } from './pat-bot';

export interface ICommandDetail {
    command: string;
    parameters?: Array<string>;
    description?: string;
}

export interface ICommands {
    commandDetails: Array<ICommandDetail>;
    category: string;
}

export interface ICommandAndCategory {
    command: string;
    category: string;
}

export interface ICommand {
    execute(params: ICommandParameters): void | Promise<void>;
    // TODO: Make all of these return a promise so we don't need to pass in
    // any parameters.
    getCommands(images?: Array<IImage>): ICommands;
}
