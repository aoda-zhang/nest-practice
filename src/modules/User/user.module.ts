import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import { UserSchema } from '@shared/schemas/user.schema'
import { RoleSchema } from '@shared/schemas/role.schema'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DBCollection.USER, schema: UserSchema },
            { name: DBCollection.ROLE, schema: RoleSchema }
        ])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export default class UserModule {}
