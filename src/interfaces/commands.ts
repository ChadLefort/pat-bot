import * as Command from '../models/commands';

export interface ICommandInfo {
    command: string;
    param?: string;
}

export interface ICommands {
    gif: Command.Gif;
    help: Command.Help;
    meow: Command.Meow;
    silly: Command.Silly;
}
