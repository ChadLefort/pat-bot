import { ICommand, ICommandDetail, ICommandParameters, IGiphy } from '../../interfaces';
import Config from '../config';
import * as request from 'request-promise';

export class Gif implements ICommand {
    private static instance: Gif;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<ICommandDetail>;

    public static getInstance(): Gif {
        return this.instance || (this.instance = new Gif());
    }

    public async execute(params: ICommandParameters): Promise<void> {
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

        try {
            let results: IGiphy = await request(options);
            params.msg.channel.sendFile(results.data.image_original_url);
        } catch (error) {
            this.logger.error(error);
        }
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
