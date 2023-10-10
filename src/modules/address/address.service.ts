import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Address, AddressDoc } from '@schemas/address.schema'
import { Model } from 'mongoose'

@Injectable()
export class AddressService {
    // inject DB module
    @InjectModel(Address.name) private AddressModel: Model<AddressDoc>
    getAddressList() {
        this.AddressModel.find()
    }
}
