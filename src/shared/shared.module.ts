import { Global, Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'

import getConfigs from '../config'

import SpeedlimitModule from './core/speedlimit/speedlimit.module'
import MiddlewareModule from './middlewares/index.module'
import DatabaseModule from './core/database/database.module'
import HealthCheckModule from './core/healthCheck/health.module'
import LoggersModule from './core/logger/logger.module'
import HttpExceptionFilter from './core/http/httpExceptionFilter'
import HttpInterceptor from './core/http/httpInterceptor'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [getConfigs],
            envFilePath: '.env',
            isGlobal: true,
            cache: true
        }),
        DatabaseModule,
        SpeedlimitModule,
        MiddlewareModule,
        HealthCheckModule,
        LoggersModule
    ],
    providers: [
        // 成功请求拦截
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpInterceptor
        },
        // 错误请求拦截
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export default class SharedModule {}
