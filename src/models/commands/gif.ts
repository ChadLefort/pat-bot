import { ICommand, ICommandDetail, ICommandParams, IGiphy } from '../../interfaces';
import Config from '../config';
import * as chalk from 'chalk';
import * as request from 'request-promise';

export class Gif implements ICommand {
    private static instance: Gif;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<ICommandDetail>;

    public static getInstance(): Gif {
        return this.instance || (this.instance = new Gif());
    }

    public execute(params: ICommandParams): void {
        const options = {
            json: true,
            qs: {
                api_key: process.env.GIPHY_KEY,
                format: 'json',
                limit: 1,
                rating: 'r',
                tag: params.processedCommand.parameter,
            },
            url: `http://api.giphy.com/v1/gifs/random`,
        };

        request(options)
            .then((results: IGiphy) => {
                params.msg.channel.sendFile(results.data.image_original_url);
            })
            .catch(error => this.logger.error(chalk.red.bold(error)));
    }

    public getCommandDetails(): Array<ICommandDetail> {
        this.commandDetails = [{
            command: 'gif',
            description: 'A random gif from giphy based on your search term.',
            parameters: ['search term'],
        }];

        return this.commandDetails;
    }
}
