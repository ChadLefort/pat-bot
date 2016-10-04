import Config from './models/config';
import PatBot from './models/pat-bot';

try {
    let patBot = new PatBot(Config.getInstance().token);
    patBot.execute();
} catch (error) {
    Config.getInstance().logger.error(error);
}
