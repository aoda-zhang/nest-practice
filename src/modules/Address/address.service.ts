import { Injectable } from '@nestjs/common';
@Injectable()
export class AddressService {
  getDetail(id: number) {
    return `测试请求id：${id}`;
  }
}
