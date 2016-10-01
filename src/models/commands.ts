import * as Interface from '../interfaces';
import { Gif } from './commands/gif';
import { Help } from './commands/help';
import { Pat } from './commands/pat';
import { Silly } from './commands/silly';
import * as _ from 'lodash';

export default class Commands {
    private static instance: Commands;
    private commandDetails: Array<Interface.ICommandDetail> = [];
    public mainCommands: Interface.IMainCommands;

    private constructor() {
        this.mainCommands = {
            gif: Gif.getInstance(),
            help: Help.getInstance(),
            pat: Pat.getInstance(),
            silly: Silly.getInstance(),
        };
    }

    public static getInstance(): Commands {
        return this.instance || (this.instance = new Commands());
    }

    public getCommandDetails(prefix: string, images: Array<Interface.IImage>): Array<Interface.ICommandDetail> {
        this.commandDetails = _.union(
            this.mainCommands.gif.getCommandDetails(),
            this.mainCommands.help.getCommandDetails(),
            this.mainCommands.pat.getCommandDetails(images),
            this.mainCommands.silly.getCommandDetails(images)
        );

        return _.chain(this.commandDetails)
            .orderBy('command', 'asc')
            .forEach(commandDetail => commandDetail.command = prefix + commandDetail.command)
            .value();
    }
}

export { Gif } from './commands/gif';
export { Help } from './commands/help';
export { Pat } from './commands/pat';
export { Silly } from './commands/silly';
