import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initSwagger from './core/apiDoc';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
const currentENV = process.env.NODE_ENV;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = app.get(ConfigService).get('PREFIX') ?? '';
  const port = app.get(ConfigService).get('PORT') ?? 3000;
  app.setGlobalPrefix(prefix); // 设置路径前缀
  await initSwagger(app);
  app.enableCors(); // 跨域设置访问
  app.use(helmet()); //防止跨站脚本攻击等安全风险
  app.use(cookieParser());
  app.use(csurf({ cookie: true })); //CSRF保护：跨站点请求伪造
  await app.listen(port, () => {
    currentENV === 'dev' &&
      console.log(`本地开发运行在 http://localhost:${port}`);
  });
}
bootstrap();
