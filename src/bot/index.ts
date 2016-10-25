import Config from './models/config';
import PatBot from './models/pat-bot';

try {
    const patBot = new PatBot(Config.getInstance().token);
    patBot.execute();
} catch (error) {
    Config.getInstance().logger.error(error);
}
