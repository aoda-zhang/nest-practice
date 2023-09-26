import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import initSwagger from 'src/shared/core/apiDoc'
import HttpExceptionFilter from '@core/http/httpExceptionFilter'
import HttpInterceptor from '@core/http/httpInterceptor'
const currentENV = process.env.NODE_ENV
async function bootstrap() {
    // 业务service建议express
    // gateway 建议fastiy
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const prefix = app.get(ConfigService).get('prefix') ?? ''
    const port = app.get(ConfigService).get('port') ?? 3000
    app.setGlobalPrefix(prefix) // 设置路径前缀
    // 全局错误过滤器
    app.useGlobalFilters(new HttpExceptionFilter())
    // 全局成功拦截
    app.useGlobalInterceptors(new HttpInterceptor())
    // 全局DTO验证
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true
        })
    )
    await initSwagger(app)
    app.enableCors() // 跨域设置访问
    app.use(helmet()) //防止跨站脚本攻击等安全风险
    app.use(cookieParser())

    await app.listen(port, () => {
        currentENV === 'dev' && console.log(`本地开发运行在 http://localhost:${port}`)
    })
}
bootstrap()
