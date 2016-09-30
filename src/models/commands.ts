import * as Interface from '../interfaces/index';
import { Gif } from './commands/gif';
import { Help } from './commands/help';
import { Meow } from './commands/meow';
import { Silly } from './commands/silly';
import * as _ from 'lodash';

export default class Commands {
    private static instance: Commands;
    private commandInfo: Array<Interface.ICommandInfo> = [];
    public commands: Interface.ICommands;

    private constructor() {
        this.commands = {
            gif: Gif.getInstance(),
            help: Help.getInstance(),
            meow: Meow.getInstance(),
            silly: Silly.getInstance(),
        };
    }

    public static getInstance(): Commands {
        return this.instance || (this.instance = new Commands());
    }

    public getCommandInfo(prefix: string, images: Array<Interface.IImage>): Array<Interface.ICommandInfo> {
        this.commandInfo = [
            { command: `${prefix}pat`},
            { command: `${prefix}help`},
            { command: `${prefix}gif`, param: 'the phrase to search' },
        ];

        _.forEach(images, (image: Interface.IImage) => {
            this.commandInfo.push({ command: `${prefix}silly`, param: image.fileName });
        });

        return this.commandInfo;
    }
}

export { Gif } from './commands/gif';
export { Help } from './commands/help';
export { Meow } from './commands/meow';
export { Silly } from './commands/silly';
