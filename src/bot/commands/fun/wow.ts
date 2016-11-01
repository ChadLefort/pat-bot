import * as Interface from '../../../interfaces';
import CommandHandler from '../../command-handler';
import Config from '../../config';
import { getImage, validateParameter } from '../../helpers';
import * as _ from 'lodash';

export class Wow implements Interface.ICommand {
    private static instance: Wow;
    private logger = Config.getInstance().logger;
    private commandDetails: Array<Interface.ICommandDetail>;

    public static getInstance(): Wow {
        return this.instance || (this.instance = new Wow());
    }

    public async execute(params: Interface.ICommandParameters): Promise<void> {
        try {
            const commandsGrouped = await CommandHandler.getInstance().getCommandsGrouped();

            if (!validateParameter(commandsGrouped, 'fun', params)) {
                return;
            }

            if (params.processedCommand.parameter === 'citizens') {
                if (params.msg.channel.type === 'text') {
                    params.msg.channel.sendMessage(this.citizens(params.msg.guild.name), { disable_everyone: false });
                } else {
                    params.msg.channel.sendMessage('Message can only be sent in a guild text channel.');
                }
            } else {
                getImage(params);
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    public async getCommands(): Promise<Interface.ICommands> {
        const images = await CommandHandler.getInstance().getImages();

        this.commandDetails = [{
            command: 'wow',
            description: 'Rhonin has something to tell you.',
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

    private citizens(guild: string): string {
        const rhonin = `@everyone CITIZENS OF ${guild.toUpperCase()}!

Raise your eyes to the skies and observe! Today our world's destruction has been averted in defiance of our very makers!

Algalon the Observer, herald of the titans, has been defeated by our brave comrades in the depths of the titan city of Ulduar.

Algalon was sent here to judge the fate of our world. He found a planet whose races had deviated from the titans' blueprints. A planet where not everything had gone according to plan.

Cold logic deemed our world not worth saving. Cold logic, however, does not account for the power of free will. It's up to each of us to prove this is a world worth saving. That our lives... our lives are worth living.`;

        return rhonin;
    }
}
