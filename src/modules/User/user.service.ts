import CreateUserDTO from '@modules/User/dtos/createUser';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserService {
    getDetail(id: string) {
        return `测试请求id：${id}`;
    }
    addUser(userInfo: CreateUserDTO) {
        return userInfo;
    }
}
