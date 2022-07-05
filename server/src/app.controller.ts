import {Controller, Get, Post, Request, Res, UseGuards} from '@nestjs/common';
import {Response} from "express";
import {AppService} from './app.service';
import {AuthenticatedGuard} from "./auth/authenticated.guard";
import {LoginGuard} from "./auth/login.guard";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @UseGuards(LoginGuard)
    @Post('login')
    login(@Res() res: Response) {
        res.redirect('/')
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/')
    getHello(@Request() req) {
        return {user: req.user}
    }
}
