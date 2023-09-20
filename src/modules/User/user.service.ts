import { DBCollectionEnum } from 'src/shared/constants/DBcollection'
import CreateUserDTO from '@modules/User/dtos/createUser'
import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDoc } from 'src/shared/schemas/user.schema'
import { Model } from 'mongoose'
@Injectable()
export class UserService {
    constructor(@InjectModel(DBCollectionEnum.USER) private userModal: Model<UserDoc>) {}
    async getDetail(id: string): Promise<User> {
        try {
            return await this.userModal.findById(id)
        } catch (error) {
            throw new HttpException('错误请求', 400)
        }
    }
    async addUser(userInfo: CreateUserDTO) {
        const res = await new this.userModal(userInfo).save()
        console.log(res)
        return res
    }
}
