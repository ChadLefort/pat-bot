import { getClassName } from '../helpers';
import * as Interface from '../interfaces';
import Config from './config';
import InstanceLoader from './instance-loader';
import * as glob from 'glob';
import * as _ from 'lodash';

export default class Commands {
    private static instance: Commands;
    private prefix = Config.getInstance().prefix;
    private logger = Config.getInstance().logger;
    public images: Array<Interface.IImage> = [];

    private constructor() {
        this.execute();
    }

    public static getInstance(): Commands {
        return this.instance || (this.instance = new Commands());
    }

    private async execute(): Promise<void> {
        try {
            this.images = await this.getImages();
        } catch (error) {
            this.logger.error(error);
        }
    }

    public getImages(): Promise<Array<Interface.IImage>> {
        let promise = new Promise((resolve, reject) => {
            glob('**/*+(*.jpg|*.png|*.gif)', { cwd: './assets/img/' }, (error, files) => {
                let images: Array<Interface.IImage> = [];

                _.forEach(files, file => {
                    let filePath = file.split('.')[0].split('/');
                    images.push({ ext: file.split('.')[1], fileName: filePath[1], folder: filePath[0] });
                });

                if (error) {
                    reject(error);
                    this.logger.error(error.message);
                    return;
                } else {
                    resolve(images);
                }
            });
        });

        return promise;
    }

    public async getCommandsGrouped(): Promise<Array<Interface.ICommands>> {
        let mainCommands = await this.getMainCommands();
        let commandsGrouped: Array<Interface.ICommands> = [];

        let promise = _.forEach(mainCommands, async (mainCommand) => {
            let className = getClassName(mainCommand.command);
            commandsGrouped.push(await InstanceLoader.getInstance<Interface.ICommand>(className).getCommands(this.images));
        });

        await Promise.all(promise);

        let results = _.chain(commandsGrouped)
            .groupBy('category')
            .map((value: any, key: any) => {
                return {
                    category: key,
                    commandDetails: <Array<Interface.ICommandDetail>>_.flatten(_.map(value, 'commandDetails')),
                };
            })
            .forEach(commands => {
                _.chain(commands.commandDetails)
                    .orderBy('command', 'asc')
                    .forEach(commandDetail => commandDetail.command = this.prefix + commandDetail.command)
                    .value();
            })
            .value();

        return results;
    }

    public getMainCommands(): Promise<Array<Interface.ICommandAndCategory>> {
        let promise = new Promise((resolve, reject) => {
            glob('**/*.ts', { cwd: './src/models/commands/' }, (error, files) => {
                let mainCommands: Array<Interface.ICommandAndCategory> = [];

                _.forEach(files, file => {
                    let filePath = file.split('.')[0].split('/');
                    if (!_.isUndefined(filePath[1])) {
                        mainCommands.push({ category: filePath[0], command: filePath[1] });
                    }
                });

                if (error) {
                    reject(error);
                    this.logger.error(error.message);
                    return;
                } else {
                    resolve(mainCommands);
                }
            });
        });

        return promise;
    }
}

export { Gif } from './commands/search/gif';
export { Help } from './commands/help/help';
export { Pat } from './commands/fun/pat';
export { Roll } from './commands/other/roll';
export { Wow } from './commands/fun/wow';
