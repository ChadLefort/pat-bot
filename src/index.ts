import { PatBot } from './pat-bot';
import { config } from 'dotenv';

config();

let patBot = new PatBot(process.env.DISCORD_TOKEN);

patBot.activate();
