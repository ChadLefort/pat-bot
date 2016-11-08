import * as Interface from '../../../interfaces';
import Config from '../../config';
import wiki from 'wikijs';

export class Wiki implements Interface.ICommand {
    private static instance: Wiki;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Wiki {
        return this.instance || (this.instance = new Wiki());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            const data = await wiki().search(params.processedCommand.parameter, 1);
            const page = await wiki().page(data.results[0]);
            const summary = await page.summary();
            let trimmedSummary = summary.substr(0, 1500);

            trimmedSummary = trimmedSummary.substr(0, Math.min(trimmedSummary.length, trimmedSummary.lastIndexOf('.')));

            if (trimmedSummary.length === 0) {
                params.msg.channel.sendMessage(`This search query contains multiple results: ${page.raw.fullurl}`);
            } else {
                params.msg.channel.sendMessage(`${trimmedSummary.split('\n').join('\n \n')}. \n \nRead more at: ${page.raw.fullurl}`);
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        this.commandDetails = [{
            command: 'wiki',
            description: 'A Wikipedia summary based on your search term.',
            parameters: ['search term'],
        }];

        return {
            category: 'search',
            commandDetails: this.commandDetails,
        };
    }
}
