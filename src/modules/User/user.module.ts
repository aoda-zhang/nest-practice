import { Module } from '@nestjs/common'
import { AddressController } from './user.controller'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/shared/schemas/user.schema'
import { DBCollectionEnum } from 'src/shared/constants/DBcollection'
@Module({
    // import other modules,then controller and service will import too
    imports: [MongooseModule.forFeature([{ name: DBCollectionEnum.USER, schema: UserSchema }])],
    // import current controller
    controllers: [AddressController],
    // import current service
    providers: [UserService],
    // export the service
    exports: [UserService]
})
export class UserModule {}
