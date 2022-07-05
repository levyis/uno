import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [UserModule],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
