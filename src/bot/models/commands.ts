import { getClassName } from '../helpers';
import * as Interface from '../interfaces';
import Config from './config';
import InstanceLoader from './instance-loader';
import * as aws from 'aws-sdk';
import * as glob from 'glob';
import * as _ from 'lodash';

export default class Commands {
    private static instance: Commands;
    private prefix = Config.getInstance().prefix;
    private logger = Config.getInstance().logger;

    public static getInstance(): Commands {
        return this.instance || (this.instance = new Commands());
    }

    public async getCommandsGrouped(): Promise<Array<Interface.ICommands>> {
        let commandsGrouped: Array<Interface.ICommands> = [];
        const mainCommands = await this.getMainCommands();
        const promises = _.map(mainCommands, async (mainCommand) => {
            let className = getClassName(mainCommand.command);
            try {
                commandsGrouped.push(await InstanceLoader.getInstance<Interface.ICommand>(className).getCommands());
            } catch (error) {
                this.logger.error(error);
            }
        });

        await Promise.all(promises);

        return _.chain(commandsGrouped)
            .groupBy('category')
            .map((value: any, key: any) => {
                return {
                    category: key,
                    commandDetails: <Array<Interface.ICommandDetail>>_.flatten(_.map(value, 'commandDetails')),
                };
            })
            .forEach(commands => {
                _.chain(commands.commandDetails)
                    .forEach(commandDetail => commandDetail.command = this.prefix + commandDetail.command)
                    .value();
            })
            .value();
    }

    public getMainCommands(): Promise<Array<Interface.ICommandAndCategory>> {
        return new Promise((resolve, reject) => {
            glob('**/*.ts', { cwd: './src/bot/models/commands/' }, (error, files) => {
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
    }

    public getImages(): Promise<Array<Interface.IImage>> {
        return new Promise((resolve, reject) => {
            const s3 = new aws.S3();
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Prefix: process.env.AWS_BUCKET_PATH,
            };

            s3.listObjects(params, (error, data) => {
                let files: Array<string> = [];
                let images: Array<Interface.IImage> = [];

                _.forEach(data.Contents, content => files.push(content.Key.replace(process.env.AWS_BUCKET_PATH, '')));

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
    }
}

export { Pat } from './commands/fun/pat';
export { Wow } from './commands/fun/wow';
export { Help } from './commands/help/help';
export { Gif } from './commands/search/gif';
export { Wiki } from './commands/search/wiki';
export { Youtube } from './commands/search/youtube';
export { Bot } from './commands/info/bot';
export { Roll } from './commands/other/roll';