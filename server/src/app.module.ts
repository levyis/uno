import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthService} from "./auth/auth.service";

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/uno'),
        AuthModule, UserModule],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {
}
