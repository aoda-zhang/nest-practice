import { BadRequestException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { DBCollection } from '@shared/schemas/DBcollection'
import { Resource } from '@shared/schemas/resource.schema'
import { Role } from '@shared/schemas/role.schema'

import ResourceDTO from './dto/resource.dto'
import RoleDTO from './dto/role.dto'
import RoleUpdateDTO from './dto/role-update'

@Injectable()
export default class ACLService {
    constructor(
        @InjectModel(DBCollection.ROLE)
        private roleModel: Model<Role>,
        @InjectModel(DBCollection.RESOURCE)
        private resourceModel: Model<Resource>
    ) {}

    validaeResource = async (resource: ResourceDTO) => {
        try {
            const resourceInstance = plainToClass(ResourceDTO, resource)
            const errors = await validate(resourceInstance)
            return !(errors?.length > 0)
        } catch (error) {
            return false
        }
    }

    addResource = async (resource: ResourceDTO | ResourceDTO[]) => {
        try {
            const resourceData = Array.isArray(resource) ? resource : [resource]
            if (!resourceData?.every((item) => this.validaeResource(item))) {
                throw new BadRequestException('权限列表数据格式错误!!')
            }
            await this.resourceModel.insertMany(resourceData)
            return true
        } catch (error) {
            throw new BadRequestException(`添加权限失败 error:${error}`)
        }
    }

    updateResourcePermission = async (resource: ResourceDTO) => {
        try {
            await this.resourceModel.findOneAndUpdate(
                { name: resource?.name },
                { $push: { permissions: { $each: resource?.permissions } } }
            )
            return true
        } catch (error) {
            throw new BadRequestException(`更新权限失败 error:${error}`)
        }
    }

    getRolePermissions = async (roles: string[]): Promise<string[]> => {
        try {
            const roleInfos = await this.roleModel.find({
                $or: [{ name: { $in: roles } }]
            })
            const rolePermissions = [
                ...new Set(roleInfos?.map((item) => item?.permissions)?.flat() ?? [])
            ]
            return rolePermissions
        } catch (error) {
            throw new BadRequestException(`获取角色权限失败 error:${error}`)
        }
    }

    addRoles = async (role: RoleDTO) => {
        try {
            const isPermissionExsting = await this.isPermissionExisting(role?.permissions)
            if (isPermissionExsting) {
                await this.roleModel.insertMany(role)
                return true
            }
            throw new BadRequestException(`更新角色失败,相关权限不存在`)
        } catch (error) {
            throw new BadRequestException(`添加角色失败 error:${error}`)
        }
    }

    updateRolePermission = async (role: RoleUpdateDTO) => {
        try {
            const isPermissionExsting = await this.isPermissionExisting(role?.permissions)
            if (isPermissionExsting) {
                await this.roleModel.findOneAndUpdate(
                    { name: role?.name },
                    { $push: { permissions: { $each: role?.permissions } } }
                )
                return true
            }
            throw new BadRequestException(`更新角色失败,相关权限不存在`)
        } catch (error) {
            throw new BadRequestException(`更新角色失败 error:${error}`)
        }
    }

    isRoleExisting = async (roles: string[]) => {
        const roleItems = await this.roleModel.find({ name: { $in: roles } }).exec()
        const roleNames = roleItems?.map((item) => item?.name)
        return roles?.every((name) => roleNames?.includes(name))
    }

    isPermissionExisting = async (permissions: string[]) => {
        const permissionItems = await this.resourceModel
            .find({
                permissions: {
                    $elemMatch: {
                        name: { $in: permissions }
                    }
                }
            })
            .exec()
        const permissionNames = permissionItems
            ?.map((item) => item?.permissions)
            ?.flat()
            ?.map((_item) => _item?.name)
        return permissions?.every((name) => permissionNames?.includes(name))
    }

    // 批量添加某个权限到role中
}
