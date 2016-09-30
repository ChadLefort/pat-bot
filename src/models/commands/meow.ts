import { ICommandParams } from '../../interfaces/index';
import * as _ from 'lodash';

export class Meow {
    private static instance: Meow;

    public static getInstance(): Meow {
        return this.instance || (this.instance = new Meow());
    }

    public execute(params: ICommandParams): void {
        let meow = ['pat'].map(cmd => params.prefix + cmd);

        if (_.includes(meow, params.msg.content)) {
            params.msg.channel.sendMessage('meow!');
        }
    }
}
