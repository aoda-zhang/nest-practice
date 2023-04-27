import { Injectable } from '@nestjs/common';
import CreateUserDTO from 'src/dtos/user/createUser';
@Injectable()
export class UserService {
  getDetail(id: number) {
    return `测试请求id：${id}`;
  }
  addUser(userInfo: CreateUserDTO) {
    return userInfo;
  }
}
