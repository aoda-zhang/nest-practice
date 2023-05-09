import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import { ServiceEnum } from 'src/constants/service';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import TestPipes from '../../core/pipes/testPipe';
import CreateUserDTO from '../../dtos/user/createUser';

@ApiTags('用户信息')
// @UsePipes(new TestPipes())
@Controller(ServiceEnum.USER)
export class AddressController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: '获取用户详情' })
    @Get('detail/:age')
    // 自定义状态码，默认200
    @HttpCode(201)
    getDetail(@Param() param: { age: number }) {
        if (param?.age < 18) {
            throw new HttpException('禁止未成年人进入此场地', 403);
        }
        return this.userService.getDetail(param?.age);
    }

    @ApiOperation({ summary: '添加用户' })
    @Post('add')
    @HttpCode(302)
    async addUser(@Body() body: CreateUserDTO) {
        if (body?.age > 18) {
            throw new HttpException('未成年人不许进入', 403);
        }

        return await this.userService.addUser(body);
    }
}
