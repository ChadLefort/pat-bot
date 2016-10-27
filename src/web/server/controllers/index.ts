import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'giuseppe';

@Controller('~/*')
class IndexController {

    @Get()
    public index( @Req() req: Request, @Res() res: Response): void {
        res.render('index');
    }
}
