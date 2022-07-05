import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Payload} from "../auth/payload";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./user";
import {RegisterDto} from "./register.dto";
import {LoginDto} from "../auth/login.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {
    }

    async create(registerDto: RegisterDto) {
        const {login} = registerDto
        const user = await this.userModel.findOne({login})
        if (user) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
        }
        const createdUser = new this.userModel(registerDto)
        await createdUser.save()
        return this.sanitizeUser(createdUser)
    }

    async findByPayload(payload: Payload) {
        const {login} = payload
        return this.userModel.findOne({login})
    }

    async findByLogin(loginDto: LoginDto) {
        const {login, password} = loginDto
        const user = await this.userModel.findOne({login})
        if (!user) {
            throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST)
        }
        if (password === user.password) {
            return this.sanitizeUser(user)
        } else {
            throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST)
        }
    }

    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
}