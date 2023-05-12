import CreateUserDTO from '@dtos/user/createUser';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserService {
    getDetail(id: number) {
        return `测试请求id：${id}`;
    }
    addUser(userInfo: CreateUserDTO) {
        return userInfo;
    }
}
