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
            // 根据自身项目选择必要的路径别名
             "@constants/*": ["src/shared/constants/*"],,
            "@core/*": ["src/shared/core/*"],
            "@modules/*": ["./src/modules/*"],
            "@schemas/*": ["src/shared/schemas/*"]
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
            :
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

> 实际项目中往往会存在多个环境，开发，测试，生产，不同的环境有着不同的配置

```ts
1. 设置不同环境
 yarn add cross-env -D
// 更改package.json 部分命令
    "scripts": {
        "build": "cross-env NODE_ENV=prod nest build",
        "start:dev": "cross-env NODE_ENV=dev nest start --watch",
        "start:prod": "cross-env NODE_ENV=prod node dist/main",
    },
```

```ts
2. 采用yaml的形式读取环境配置
yarn add js-yaml
yarn add @types/js-yaml -D
// config/index.ts
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'
const environment = process.env.NODE_ENV ?? 'dev'
const getConfig = (type?: string) => {
    const yamlPath = join(process.cwd(), `./config/${environment}.yaml`)
    const config = yaml.load(readFileSync(yamlPath, 'utf8'))
    if (type) {
        return config[type]
    }
    return config
}
export default getConfig
```

```ts
3. moudule中注册
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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
        })
    ],
})
export class AppModule {}

```

```ts
4. service中使用
 const prefix = app.get(ConfigService).get('PREFIX') ?? ''Ï
```

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

```ts
// main.ts
app.setGlobalPrefix("全局前缀")
```

## DTO 配合验证
## 代码提交格式化
## JWT设置 白名单设置

## 一键生成模块文件

```ts
// 1. 全局安装nest脚手架（自行百度）
// 2. nest -h 查询具体命令
```

## API版本控制

```ts
// 通常当产品更新为不同版本，并且原来API无法满足业务需求时，便需要对API版本升级，此时设置版本号，切换为新的版本便是更好的选择
// 可以直接在contrl中设置verstion来管理版本
@Controller({ path:"app",version: '1' })
```

## 第三方service应用

## Redis使用

## MQ使用

## 健康检查







