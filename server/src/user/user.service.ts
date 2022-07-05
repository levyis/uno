import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {
    private readonly users: any[]

    constructor() {
        this.users = [
            {
                username: 'admin',
                password: '1234'
            }
        ]
    }

    async findOne(username: string): Promise<any> {
        return this.users.find(user => user.username === username)
    }
}