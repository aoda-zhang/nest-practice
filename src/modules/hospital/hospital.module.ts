import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import { HospitalSchema } from '@shared/schemas/hospital.schema'

import { HospitalController } from './hospital.controller'
import { HospitalService } from './hospital.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: DBCollection.HOSPITAL, schema: HospitalSchema }])],
    controllers: [HospitalController],
    providers: [HospitalService],
    exports: [HospitalService]
})
export class HospitalModule {}
