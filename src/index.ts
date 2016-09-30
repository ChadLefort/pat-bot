import Config from './models/config';
import PatBot from './models/pat-bot';

let config = new Config();
let patBot = new PatBot(process.env.DISCORD_TOKEN, config.logger());

patBot.execute();
