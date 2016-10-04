import { ICommandParams, IImage } from './pat-bot';

export interface ICommandDetail {
    command: string;
    parameters?: Array<string>;
    description?: string;
}

export interface ICommand {
    execute(params: ICommandParams): void;
    getCommandDetails(images?: Array<IImage>): Array<ICommandDetail>;
}
