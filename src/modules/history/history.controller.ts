import { Body, Controller, Post, Logger, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import ACLPermissions from '@shared/decorators/ACL.decorator'

import CreateHospitalDto from './dto/create-history.dto'
import { HistoryService } from './history.service'

@ApiTags('hospital module')
@Controller('history')
export class HistoryController {
    logger: Logger = new Logger(HistoryController.name, { timestamp: true })

    constructor(private readonly historyService: HistoryService) {}

    @ACLPermissions(['HOSPITAL_ADD'])
    @Post('/add')
    addHospital(@Req() req, @Body() createHospitalDto: CreateHospitalDto) {
        const userName = req?.user?.userName
        const userID = req?.user?.userID
        return this.historyService.create({ ...createHospitalDto, userName, userID })
    }
}
