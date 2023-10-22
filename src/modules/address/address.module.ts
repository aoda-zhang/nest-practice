import { Module } from '@nestjs/common'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Address, AddressSchema } from '@shared/schemas/address.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Address.name, // schema name
                schema: AddressSchema // DB schema
            }
        ])
    ],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService]
})
export class AddressModule {}
