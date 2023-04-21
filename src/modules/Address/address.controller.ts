import { Controller, Get, Param } from '@nestjs/common';
import { ServiceEnum } from 'src/constants/service';
import { AddressService } from './address.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('地址')
@Controller(ServiceEnum.ADDRESS)
export class AddressController {
  constructor(private addressService: AddressService) {}

  @ApiOperation({ summary: '获取文章详情' })
  @Get('detail/:id')
  getDetail(@Param() param: { id: number }) {
    return this.addressService.getDetail(param?.id);
  }
}
