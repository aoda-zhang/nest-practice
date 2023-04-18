import { Controller, Get, Param } from '@nestjs/common';
import { ServiceEnum } from 'src/constants/service';
import { AddressService } from './address.service';

@Controller(ServiceEnum.ADDRESS)
export class AddressController {
  constructor(private addressService: AddressService) {}
  @Get('detail/:id')
  getDetail(@Param() param: { id: number }) {
    return this.addressService.getDetail(param?.id);
  }
}
