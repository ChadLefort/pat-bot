import { getImage } from '../../helpers';
import { ICommand, ICommandDetail, ICommandParams, IImage } from '../../interfaces';
import * as _ from 'lodash';

export class Silly implements ICommand {
    private static instance: Silly;
    private commandDetails: Array<ICommandDetail>;

    public static getInstance(): Silly {
        return this.instance || (this.instance = new Silly());
    }

    public execute(params: ICommandParams): void {
        if (params.processedCommand.parameter === 'citizens') {
            params.msg.channel.sendMessage(this.citizens(params.msg.guild.name), { disable_everyone: false });
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

    public getCommandDetails(images: Array<IImage>): Array<ICommandDetail> {
        this.commandDetails = [{
            command: 'silly',
            description: 'Rhonin has something to tell you!',
            parameters: ['citizens'],
        }];

        _.forEach(images, (image: IImage) => {
            this.commandDetails.push(
                {
                    command: image.folder,
                    description: 'A silly meme, gif, or image.',
                    parameters: [image.fileName],
                }
            );
        });

        return this.commandDetails;
    }
}
