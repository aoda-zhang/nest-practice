import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import { ResourceSchema } from '@shared/schemas/resource.schema'
import { RoleSchema } from '@shared/schemas/role.schema'

import ACLService from './ACLs.service'
import ACLController from './ACLs.controller'

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DBCollection.ROLE, schema: RoleSchema },
            { name: DBCollection.RESOURCE, schema: ResourceSchema }
        ])
    ],
    controllers: [ACLController],
    providers: [ACLService],
    exports: [ACLService]
})
export default class ACLModule {}
