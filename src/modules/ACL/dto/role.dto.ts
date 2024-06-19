import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export default class RoleDTO {
    @ApiProperty({ description: '角色名称' })
    @IsString()
    @Type(() => String)
    @MaxLength(50, { message: '角色名称最多为50' })
    name: string

    @ApiProperty({ description: '角色描述' })
    @IsNotEmpty({ message: '医院名称为必填项' })
    @IsString()
    @Type(() => String)
    @MaxLength(200, { message: '角色描述最多为200' })
    desc: string

    @ApiProperty({ description: '角色权限列表' })
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => String)
    permissions: string[]
}
