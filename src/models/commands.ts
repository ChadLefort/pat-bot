import * as Interface from '../interfaces';
import Config from './config';
import InstanceLoader from './instance-loader';
import * as Promise from 'bluebird';
import * as chalk from 'chalk';
import * as glob from 'glob';
import * as _ from 'lodash';
import * as path from 'path';

export default class Commands {
    private static instance: Commands;
    private prefix = Config.getInstance().prefix;
    private logger = Config.getInstance().logger;

    public static getInstance(): Commands {
        return this.instance || (this.instance = new Commands());
    }

    public getCommandDetails(images: Array<Interface.IImage>): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.getMainCommands().then(mainCommands => {
                let commandDetails: Array<Interface.ICommandDetail> = [];

                _.forEach(mainCommands, mainCommand => {
                    let className = _.chain(_.split(mainCommand, '-')).map((value: string) => _.capitalize(value)).join('').value();

                    _.forEach(InstanceLoader.getInstance<Interface.ICommand>(className).getCommandDetails(images), commandDetail => {
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

    public getMainCommands(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            glob('**/*.ts', { cwd: './src/models/commands/' }, (error, files) => {
                let mainCommands: Array<string> = [];

                _.forEach(files, file => {
                    mainCommands.push(path.basename(file, path.extname(file)));
                });

                if (error) {
                    reject(error);
                    this.logger.error(chalk.red.bold(error.message));
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
export { Silly } from './commands/silly';
