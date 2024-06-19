import { Body, Controller, Get, Param, Post, Put, Logger } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import ACLPermissions from '@shared/decorators/ACL.decorator'

import { HospitalService } from './hospital.service'

@ApiTags('hospital module')
@Controller('hospital')
export class HospitalController {
    logger: Logger = new Logger(HospitalController.name, { timestamp: true })

    constructor(private readonly hospitalService: HospitalService) {}

    @Post('/add')
    addHospital(@Body() hospitals: string[]) {
        return this.hospitalService.create(hospitals)
    }

    @ACLPermissions(['HOSPITAL_GET'])
    @Get('/list/:id?')
    getHospital(@Param('id') id?: string) {
        return this.hospitalService.getHospital(id)
    }

    @Post('/update/:id?')
    update(@Body() updateHospitalDto: string[], @Param('id') id?: string) {
        return this.hospitalService.update(updateHospitalDto, id)
    }

    @Put('/remove/:id')
    remove(@Param('id') id: string) {
        return this.hospitalService.remove(id)
    }
}
