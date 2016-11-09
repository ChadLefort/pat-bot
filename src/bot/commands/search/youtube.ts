import Config from '../../../config';
import * as Interface from '../../../interfaces';
import * as bluebird from 'bluebird';
import * as YouTube from 'youtube-node';

export class Youtube implements Interface.ICommand {
    private static instance: Youtube;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Youtube {
        return this.instance || (this.instance = new Youtube());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            const youTube = new YouTube();
            youTube.setKey(process.env.YOUTUBE_KEY);
            const youTubeSearch = <any>bluebird.promisify(youTube.search);
            const results = await youTubeSearch(params.processedCommand.parameter, 1);
            const videoId = results.items[0].id.videoId;

            params.msg.channel.sendMessage(`http://www.youtube.com/watch?v=${videoId}`);
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        this.commandDetails = [{
            command: 'youtube',
            description: 'A YouTube video based on your search term.',
            parameters: ['search term'],
        }];

        return {
            category: 'search',
            commandDetails: this.commandDetails,
        };
    }
}
