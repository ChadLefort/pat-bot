import * as Command from '../models/commands';

export interface IMainCommands {
    gif: Command.Gif;
    help: Command.Help;
    pat: Command.Pat;
    silly: Command.Silly;
}

export interface ICommandDetail {
    command: string;
    parameters?: Array<string>;
    description?: string;
}
