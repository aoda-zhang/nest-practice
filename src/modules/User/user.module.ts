import { Module } from '@nestjs/common';
import { AddressController } from './user.controller';
import { UserService } from './user.service';
// const envPath=''
@Module({
  // import other modules,then controller and service will import too
  imports: [],
  // import current controller
  controllers: [AddressController],
  // import current service
  providers: [UserService],
  // export the service
  exports: [UserService],
})
export class UserModule {}
