import { PartialType } from '@nestjs/swagger'

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
