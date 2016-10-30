import CommandHandler from '../../../bot/models/command-handler';
import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'giuseppe';

@Controller('commands')
class IndexController {

    @Get()
    public commands( @Req() req: Request, @Res() res: Response) {
        CommandHandler.getInstance().getCommandsGrouped().then(commands => res.json(commands));
    }
}
