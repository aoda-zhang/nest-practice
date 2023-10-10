import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AddressModule } from './modules/address/address.module'
import getConfig from 'config'
@Module({
    // 所有子模块必须在app中注册，子模块如果有自己的module，可在imports中引入，app会自动注册controoler和service
    // 如果子模块不存在自己的module，则需要在app中的controller中注册子模块controller，在app的privide中注册子模块的service
    imports: [
        // 加载config
        ConfigModule.forRoot({
            load: [getConfig],
            isGlobal: true, // 全局注入
            cache: true, // 是否缓存config
            ignoreEnvFile: false // 取消读取env文件
        }),
        // API限速设置
        ThrottlerModule.forRoot({
            // 100 times 1 minutes
            ttl: 60,
            limit: 100
        }),
        // mongodb数据库连接
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            // u need set DB name when there has multiple DB
            // connectionName: 'serviceDB',
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get('serviceDB')?.uri ?? '',
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            },
            inject: [ConfigService]
        }),
        AddressModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // speed limit
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
