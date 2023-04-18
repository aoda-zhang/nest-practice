import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './modules/Address/address.module';

@Module({
  // 所有子模块必须在app中注册，子模块如果有自己的module，可在imports中引入，app会自动注册controoler和service
  // 如果子模块不存在自己的module，则需要在app中的controller中注册子模块controller，在app的privide中注册子模块的service
  imports: [AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
