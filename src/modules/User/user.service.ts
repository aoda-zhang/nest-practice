import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import { User } from '@shared/schemas/user.schema'
import { Role } from '@shared/schemas/role.schema'
import ACLService from '@modules/ACL/ACLs.service'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(DBCollection.USER) private userModel: Model<User>,
        @InjectModel(DBCollection.ROLE) private roleModel: Model<Role>,
        private ACL: ACLService
    ) {}

    async getUserInfo(userName: string) {
        try {
            const userInfo = await this.userModel.findOne({ userName })
            if (!userInfo) {
                throw new UnauthorizedException('用户不存在')
            }
            return userInfo
        } catch (error) {
            throw new UnauthorizedException(`${error?.message}`)
        }
    }

    addUserRoles = async (userID: string, roles: string[]) => {
        try {
            const isRoleExisting = await this.ACL.isRoleExisting(roles)
            if (isRoleExisting) {
                await this.userModel.findByIdAndUpdate(userID, { roles })
                return true
            }
            throw new BadRequestException('role NOT exising!!')
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
