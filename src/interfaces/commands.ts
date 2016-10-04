import { ICommandParameters, IImage } from './pat-bot';

export interface ICommandDetail {
    command: string;
    parameters?: Array<string>;
    description?: string;
}

export interface ICommand {
    execute(params: ICommandParameters): void | Promise<void>;
    getCommandDetails(images?: Array<IImage>): Array<ICommandDetail>;
}
