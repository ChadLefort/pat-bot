import Config from '../../../config';
import * as Interface from '../../../interfaces';
import * as request from 'axios';

export class Gif implements Interface.ICommand {
    private static instance: Gif;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Gif {
        return this.instance || (this.instance = new Gif());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            const requestParams = {
                api_key: process.env.GIPHY_KEY,
                format: 'json',
                limit: 1,
                rating: 'r',
                tag: params.processedCommand.parameter,
            };
            const { data } = await request.get('http://api.giphy.com/v1/gifs/random', { params: requestParams });
            const giphy = <Interface.IGiphy>data;

            params.msg.channel.sendFile(giphy.data.image_original_url);
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        this.commandDetails = [{
            command: 'gif',
            description: 'A random gif from giphy based on your search term.',
            parameters: ['search term'],
        }];

        return {
            category: 'search',
            commandDetails: this.commandDetails,
        };
    }
}
