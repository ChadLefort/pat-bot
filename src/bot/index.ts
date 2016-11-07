import Config from './config';
import PatBot from './pat-bot';

try {
    const patBot = new PatBot(Config.getInstance().token);
    patBot.execute();
} catch (error) {
    Config.getInstance().logger.error(error);
}
