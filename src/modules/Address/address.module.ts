import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
// const envPath=''
@Module({
  // import other modules,then controller and service will import too
  imports: [],
  // import current controller
  controllers: [AddressController],
  // import current service
  providers: [AddressService],
  // export the service
  exports: [AddressService],
})
export class AddressModule {}
