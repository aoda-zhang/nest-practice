import { Module } from '@nestjs/common'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { DBCollectionEnum } from '@constants/DBcollection'
import { AddressSchema } from '@schemas/address.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: DBCollectionEnum.ADDRESS, schema: AddressSchema }])
    ],
    controllers: [AddressController],
    providers: [AddressService]
})
export class AddressModule {}
