import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_GUARD } from '@nestjs/core'

import UserModule from '@modules/user/user.module'
import { DBCollection } from '@shared/schemas/DBcollection'
import { UserSchema } from '@shared/schemas/user.schema'
import HMACGuard from '@shared/guards/hmac.guard'
import JWTGuard from '@shared/guards/jwt.guard'
import ACLGuard from '@shared/guards/acl.guard'
import ACLModule from '@modules/ACL/ACLs.module'

import { AuthController } from './auth.controller'
import AuthService from './auth.service'
import { EncryptService } from './encrypt.service'
// 提升为全局模块
@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: DBCollection.USER, schema: UserSchema }]),
        JwtModule,
        ACLModule,
        UserModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        EncryptService,
        {
            provide: APP_GUARD,
            useClass: HMACGuard
        },
        {
            provide: APP_GUARD,
            useClass: JWTGuard
        },
        {
            provide: APP_GUARD,
            useClass: ACLGuard
        }
    ],
    exports: [AuthService, EncryptService]
})
export default class AuthModule {}
