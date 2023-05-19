import { Body, Controller, Get, HttpCode, HttpException, Param, Post } from '@nestjs/common'
import { DBCollectionEnum } from '@constants/DBcollection'
import { UserService } from './user.service'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import CreateUserDTO from '@modules/User/dtos/createUser'

@ApiTags('用户信息')
// @UsePipes(new TestPipes())
@Controller(DBCollectionEnum.USER)
export class AddressController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: '获取用户详情' })
    @ApiParam({ name: 'id', description: '用户id' })
    @Get('detail/:id')
    // 自定义状态码，默认200
    @HttpCode(201)
    async getDetail(@Param() param: { id: string }) {
        return await this.userService.getDetail(param?.id)
    }

    @ApiOperation({ summary: '添加用户' })
    @Post('add')
    @HttpCode(302)
    async addUser(@Body() body: CreateUserDTO) {
        if (body?.age < 18) {
            throw new HttpException('未成年人不许进入', 403)
        }
        return await this.userService.addUser(body)
    }
}
