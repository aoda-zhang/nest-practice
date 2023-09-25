import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
    Contains,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength
} from 'class-validator'

export default class CreateUserDTO {
    // 必选项描述
    @ApiProperty({ description: '用户姓名', default: '二狗' }) // 默认值设置
    @IsNotEmpty({ message: '姓名为必填项' })
    @IsString()
    @MinLength(2, { message: '姓名最小长度为2' })
    @MaxLength(10, { message: '姓名最大长度为10' })
    readonly name: string

    @ApiProperty({ description: '电话', default: '19102632828' })
    @IsNotEmpty({ message: '电话为必填项' })
    // @IsPhoneNumber('CN', { message: '不是正确的中国手机号码' })
    readonly phone: number
}
