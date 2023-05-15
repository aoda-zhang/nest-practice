import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@modules/User/user.module';
import { MongooseModule } from '@nestjs/mongoose';

// 当前环境变量
const currentENV = process.env.NODE_ENV;

@Module({
    // 所有子模块必须在app中注册，子模块如果有自己的module，可在imports中引入，app会自动注册controoler和service
    // 如果子模块不存在自己的module，则需要在app中的controller中注册子模块controller，在app的privide中注册子模块的service
    imports: [
        // 默认读取根目录的.env文件
        ConfigModule.forRoot({
            envFilePath: `./config/env/${currentENV}.env`,
            isGlobal: true, // 全局注入
            cache: true // 是否缓存config
        }),
        // API限速设置
        ThrottlerModule.forRoot({
            ttl: 60, //1分钟
            limit: 100 //请求100次
        }),
        MongooseModule.forRoot('mongodb+srv://aoda2826:zyr199373.@aoda-db.nomzyht.mongodb.net/DEV'),
        UserModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // 全局进行限速处理
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
