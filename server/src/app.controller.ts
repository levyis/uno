import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {UserService} from "./user/user.service";
import {AuthService} from "./auth/auth.service";
import {RegisterDto} from "./user/register.dto";
import {LoginDto} from "./auth/login.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller()
export class AppController {
    constructor(private userService: UserService, private authService: AuthService) {
    }

    @Post('register')
    async register(@Body() registerDTO: RegisterDto) {
        const user = await this.userService.create(registerDTO);
        const payload = {login: user.login};
        const token = await this.authService.signPayload(payload);
        return {user, token};
    }

    @Post('login')
    async login(@Body() loginDTO: LoginDto) {
        const user = await this.userService.findByLogin(loginDTO);
        const payload = {login: user.login};
        const token = await this.authService.signPayload(payload);
        return {user, token};
    }

    @Get('/profile')
    @UseGuards(AuthGuard('jwt'))
    getHello(@Request() req) {
        return {user: req.user}
    }
}
