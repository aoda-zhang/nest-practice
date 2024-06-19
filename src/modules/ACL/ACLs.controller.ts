import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import ACLPermissions from '@shared/decorators/ACL.decorator'

import ACLService from './ACLs.service'
import ResourceDTO from './dto/resource.dto'
import RoleDTO from './dto/role.dto'
import RoleUpdateDTO from './dto/role-update'

@ApiTags('ACL module')
@Controller('ACL')
export default class ACLController {
    constructor(private ACL: ACLService) {}

    @Get('/role/permissions')
    getRolePermissions(@Req() req: { user: { roles: string[] } }) {
        return this.ACL.getRolePermissions(req?.user?.roles)
    }

    @ACLPermissions(['ROLE_ADD'])
    @Post('/role/add')
    addRole(@Body() role: RoleDTO) {
        return this.ACL.addRoles(role)
    }

    @ACLPermissions(['ROLE_UPDATE'])
    @Put('/role/update')
    updateRolePermission(@Body() roles: RoleUpdateDTO) {
        return this.ACL.updateRolePermission(roles)
    }

    @ACLPermissions(['RES_ADD'])
    @Post('/resource/add')
    addResource(@Body() resource: ResourceDTO | ResourceDTO[]) {
        return this.ACL.addResource(resource)
    }

    @ACLPermissions(['RES_UPDATE'])
    @Put('/resource/update')
    updateResourcePermission(@Body() resource: ResourceDTO) {
        return this.ACL.updateResourcePermission(resource)
    }
}
