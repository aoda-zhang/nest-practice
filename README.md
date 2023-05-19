# Should read it before you start 
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## 路径别名
> 随着项目越来越复杂，项目文件结构会越发复杂，因此很有必要对文件路径所“缩写处理”

```ts
// tsconfig.json中配置
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@constants/*": ["./src/constants/*"], // 根据自身项目选择必要的路径别名
            "@core/*": ["./src/core/*"],
            "@dtos/*": ["./src/dtos/*"],
            "@modules/*": ["./src/modules/*"],
            "@schemas/*": ["./src/schemas/*"]
        },
    }
}

```



## 成功与错误拦截统一格式处理

```ts
// ------------错误格式统一处理------------
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpResType } from './interface';
// 全局错误拦截处理
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取请求上下文
        const response = ctx.getResponse();
        const errorRes = exception.getResponse();

        // 设置错误信息
        // @ts-ignore
        const message = errorRes?.message
            ? // @ts-ignore
              errorRes?.message
            : exception?.message
            ? exception.message
            : 'Service error';

        const status = exception.getStatus()
            ? exception.getStatus()
            : // @ts-ignore
              errorRes?.statusCode ?? 400;

        const errorResponse: HttpResType = {
            status,
            isSuccess: false,
            message,
            data: null
        };
        response.status(status);
        response.send(errorResponse);
    }
}

// ------------成功格式统一处理------------

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpResType } from './interface';
// 全局成功请求拦截处理
@Injectable()
export default class HttpInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const status = context?.switchToHttp()?.getResponse()?.statusCode ?? 200;
                const successResponse: HttpResType = {
                    status,
                    isSuccess: true,
                    message: '请求成功',
                    data
                };
                return successResponse;
            })
        );
    }
}


// 入口方法main.ts中注册全局成功和错误统一拦截

// 全局错误过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局成功拦截
    app.useGlobalInterceptors(new HttpInterceptor());



```



## 数据库配置
## config配置
## swagger文档集成

> 提供给前端的后端API文档

```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const initSwagger = (app: INestApplication) => {
    const swaggerTitle = app.get(ConfigService).get('SWAGGERTITLE') ?? '';
    const swaggerDesc = app.get(ConfigService).get('SWAGGERDESCRIPTION') ?? '';
    const swaggerVersion = app.get(ConfigService).get('SWAGGERVERSION') ?? '';
    const swaggerPrefix = app.get(ConfigService).get('SWAGGERPREFIX') ?? '';
    const swaggerOptions = new DocumentBuilder()
        .setTitle(swaggerTitle)
        .setDescription(swaggerDesc)
        .setVersion(swaggerVersion)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(swaggerPrefix, app, document);
};
export default initSwagger;

// 入口方法main.ts中引入
initSwagger(app);
```



## CRUD
## 静态资源配置
## 公共请求前缀设置
## config的配置和获取
## DTO 配合验证
## 代码提交格式化
## 数据库连接（Mogodb）
