import Config from '../config';
import CommandHandler from './command-handler';
import * as Discord from 'discord.js';

export default class PatBot {
    private logger = Config.getInstance().logger;
    private client: Discord.Client;

    constructor(private token: string) {
        this.client = new Discord.Client();
        this.client.login(this.token);
    }

    public execute(): void {
        try {
            this.client.on('ready', () => {
                this.logger.info('Meow! I am ready for commands!');
            });

            this.client.on('message', msg => {
                CommandHandler.getInstance().handleCommand(msg);
            });

            this.client.on('error', error => {
                this.logger.error(error.message);
            });
        } catch (error) {
            this.logger.error(error);
        }
    }
}
