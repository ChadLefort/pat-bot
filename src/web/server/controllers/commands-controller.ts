import CommandHandler from '../../../bot/command-handler';
import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'giuseppe';

@Controller('commands')
export class CommandsController {

    @Get()
    public commands( @Req() req: Request, @Res() res: Response) {
        CommandHandler.getInstance().getCommandsGrouped().then(commands => res.json(commands));
    }
}
