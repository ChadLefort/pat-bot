import * as request from 'axios';
import { action, observable } from 'mobx';

export default class CommandsStore {
    @observable public isLoading: boolean = false;
    @observable public commands: Array<any> = [];

    constructor() {
        this.getCommands();
    }

    @action public getCommands() {
        this.isLoading = true;
        request.get('/api/commands').then(action('get commands', (results: any) => {
            this.commands = results.data;
            this.isLoading = false;
        }));
    }
}
