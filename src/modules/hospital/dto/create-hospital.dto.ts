import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export default class CreateHospitalDto {
    // 必选项描述
    @ApiProperty({ description: '医院地址', default: '爱心宠物医院' }) // 默认值设置
    @IsNotEmpty({ message: '医院名称为必填项' })
    @IsString()
    @Type(() => String)
    @MinLength(2, { message: '医院名称最小长度为2' })
    @MaxLength(10, { message: '医院名称最大长度为20' })
    name: string

    @ApiProperty({ description: '是否需要移除', default: false })
    // 可选值
    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    isRemove = false
}
