import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {Payload} from "./payload";
import {sign} from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    async signPayload(payload: Payload) {
        return sign(payload, 'secret', {expiresIn: '1d'}) // 1 день
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload)
    }
}