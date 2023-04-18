import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './modules/Address/address.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // 所有子模块必须在app中注册，子模块如果有自己的module，可在imports中引入，app会自动注册controoler和service
  // 如果子模块不存在自己的module，则需要在app中的controller中注册子模块controller，在app的privide中注册子模块的service
  imports: [
    AddressModule,
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      // load: [getConfig], // 加载配置文件
      cache: true, // 是否缓存config
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
