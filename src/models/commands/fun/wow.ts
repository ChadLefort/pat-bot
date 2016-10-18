import { getImage } from '../../../helpers';
import * as Interface from '../../../interfaces';
import * as _ from 'lodash';

export class Wow implements Interface.ICommand {
    private static instance: Wow;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Wow {
        return this.instance || (this.instance = new Wow());
    }

    public execute(params: Interface.ICommandParameters): void {
        if (params.processedCommand.parameter === 'citizens') {
            if (params.msg.channel.type === 'text') {
                params.msg.channel.sendMessage(this.citizens(params.msg.guild.name), { disable_everyone: false });
            } else {
                params.msg.channel.sendMessage('Message can only be sent in a guild text channel.');
            }
        } else {
            getImage(params);
        }
    }

    private citizens(guild: string): string {
        let rhonin = `@everyone CITIZENS OF ${guild.toUpperCase()}!

Raise your eyes to the skies and observe! Today our world's destruction has been averted in defiance of our very makers!

Algalon the Observer, herald of the titans, has been defeated by our brave comrades in the depths of the titan city of Ulduar.

Algalon was sent here to judge the fate of our world. He found a planet whose races had deviated from the titans' blueprints. A planet where not everything had gone according to plan.

Cold logic deemed our world not worth saving. Cold logic, however, does not account for the power of free will. It's up to each of us to prove this is a world worth saving. That our lives... our lives are worth living.`;

        return rhonin;
    }

    public getCommands(images: Array<Interface.IImage>): Interface.ICommands {
        this.commandDetails = [{
            command: 'wow',
            description: 'Rhonin has something to tell you!',
            parameters: ['citizens'],
        }];

        _.forEach(_.filter(images, { folder: 'wow' }), (image: Interface.IImage) => {
            this.commandDetails.push(
                {
                    command: image.folder,
                    description: 'A WoW related meme, gif, or image.',
                    parameters: [image.fileName],
                }
            );
        });

        return {
            category: 'fun',
            commandDetails: this.commandDetails,
        };
    }
}
