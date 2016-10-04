import * as Interface from '../interfaces';
import Config from './config';
import InstanceLoader from './instance-loader';
import * as glob from 'glob';
import * as _ from 'lodash';
import * as path from 'path';

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

    private getImages(): Promise<Array<Interface.IImage>> {
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

    public getCommandDetails(): Promise<Array<Interface.ICommandDetail>> {
        let promise = new Promise((resolve, reject) => {
            this.getMainCommands().then(mainCommands => {
                let commandDetails: Array<Interface.ICommandDetail> = [];

                _.forEach(mainCommands, mainCommand => {
                    let className = _.chain(_.split(mainCommand, '-')).map((value: string) => _.capitalize(value)).join('').value();

                    _.forEach(InstanceLoader.getInstance<Interface.ICommand>(className).getCommandDetails(this.images), commandDetail => {
                        commandDetails.push(commandDetail);
                    });
                });

                let results = _.chain(commandDetails)
                    .orderBy('command', 'asc')
                    .forEach(commandDetail => commandDetail.command = this.prefix + commandDetail.command)
                    .value();

                resolve(results);
            });
        });

        return promise;
    }

    public getMainCommands(): Promise<Array<string>> {
        let promise = new Promise((resolve, reject) => {
            glob('**/*.ts', { cwd: './src/models/commands/' }, (error, files) => {
                let mainCommands: Array<string> = [];

                _.forEach(files, file => {
                    mainCommands.push(path.basename(file, path.extname(file)));
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

export { Gif } from './commands/gif';
export { Help } from './commands/help';
export { Pat } from './commands/pat';
export { Roll } from './commands/roll';
export { Silly } from './commands/silly';
