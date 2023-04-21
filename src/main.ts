import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initSwagger from './core/swagger';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1'); // 设置路径前缀
  await initSwagger(app);
  app.enableCors(); // 跨域设置访问
  app.use(helmet()); //防止跨站脚本攻击等安全风险
  app.use(csurf()); //CSRF保护：跨站点请求伪造
  await app.listen(3000);
}
bootstrap();
