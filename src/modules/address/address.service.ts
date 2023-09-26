import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DBCollectionEnum } from '@constants/DBcollection'
import { Model } from 'mongoose'
import { AddressDoc } from '@schemas/address.schema'

@Injectable()
export class AddressService {
    constructor(@InjectModel(DBCollectionEnum.ADDRESS) private AddressModel: Model<AddressDoc>) {}

    findAll() {
        return this.AddressModel.find()
    }
}
