import * as Discord from 'discord.js';
import * as glob from 'glob';
import * as _ from 'lodash';

export class PatBot {
    private images: Array<string>;
    private client: Discord.Client;
    private prefix: string = '!';
    private commands: Array<any>;

    constructor(private token: string) {
        this.client = new Discord.Client();
        this.client.login(this.token);
    }

    public activate() {
        this.images = [];

        this.getImages().then(data => {
            this.images = data;
            this.commands = this.getCommands();
        });

        this.client.on('ready', () => {
            console.log('I am ready!');
        });

        this.client.on('message', msg => {
            let command = _.find(this.commands, { name: msg.content.replace('!', '') });

            if (!msg.content.startsWith(this.prefix) || msg.author.bot || !command) {
                return;
            }

            switch (command.type) {
                case 'help':
                    this.sendHelp(msg);
                case 'img':
                    this.sendImage(msg);
                default:
                    this.sendMeow(msg);
            }
        });
    }

    private getCommands(): Array<any> {
        let commands = [
            { name: 'help', type: 'help' },
            { name: 'pat', type: 'meow' },
            { name: 'cat', type: 'meow' },
            { name: 'hello', type: 'meow' },
        ];

        _.forEach(this.images, (image: any) => {
            commands.push({ name: image.fileName, type: 'img' });
        });

        return commands;
    }

    private getImages(): Promise<Array<any>> {
        let promise = new Promise((resolve, reject) => {
            glob('+(*.jpg|*.png|*.gif)', { cwd: './assets/' }, (error, files) => {
                let images: Array<any> = [];

                _.forEach(files, file => {
                    images.push({ ext: file.split('.')[1], fileName: file.split('.')[0] });
                });

                if (images.length >= 1) {
                    resolve(images);
                } else {
                    reject('There was an error getting images!');
                }
            });
        });

        return promise;
    }

    private sendHelp(msg: Discord.Message): void {
        let help: Array<any> = [];

        _.forEach(this.commands, (command, index) => {
            help.push(`command: ${command.name}, type: ${command.type}`);
        });

        msg.channel.sendMessage('```' + help.join('\n') + '```');
    }

    private sendMeow(msg: Discord.Message) {
        let meow = ['pat', 'cat', 'hello'].map(cmd => this.prefix + cmd);

        if (_.includes(meow, msg.content)) {
            msg.channel.sendMessage('meow!');
        }
    }

    private sendImage(msg: Discord.Message) {
        let image: any = _.find(this.images, { fileName: msg.content.replace('!', '') });

        if (image) {
            if (msg.content.startsWith(this.prefix + image.fileName)) {
                msg.channel.sendFile(`./assets/${image.fileName}.${image.ext}`)
                    .then(() => {
                        msg.delete();
                    });
            }
        }
    }
}
