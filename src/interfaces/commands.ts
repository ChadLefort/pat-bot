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

export interface ICommand {
    execute(params: ICommandParameters): void | Promise<void>;
    getCommands(images?: Array<IImage>): ICommands;
}
