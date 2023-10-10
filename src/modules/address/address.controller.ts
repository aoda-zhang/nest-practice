import { Controller, Get, UseGuards } from '@nestjs/common'
import { AddressService } from './address.service'
import { RoleGuard } from '@core/guards/role.guard'

@Controller({ path: 'address', version: 'v1' })
@UseGuards(RoleGuard)
export class AddressController {
    constructor(private readonly addressService: AddressService) {}
    @Get('/role')
    findAll() {
        return 'hello world'
    }
    @Get('/list')
    getAddressList() {
        return this.addressService.getAddressList()
    }
}
