import { ICommandParams, IGiphy } from '../../interfaces/index';
import * as chalk from 'chalk';
import * as request from 'request-promise';

export class Gif {
    private static instance: Gif;

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
                tag: params.processedCommand.param,
            },
            url: `http://api.giphy.com/v1/gifs/random`,
        };

        request(options)
            .then((results: IGiphy) => {
                params.msg.channel.sendFile(results.data.image_original_url);
            })
            .catch(error => params.logger.error(chalk.red.bold(error)));
    }
}
