import CommandsStore from '../stores/commands-store';
import { IStores } from '../types';

export default function createStores(): IStores {
    return {
        commandsStore: new CommandsStore(),
    };
}
