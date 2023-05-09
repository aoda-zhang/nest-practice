import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  Contains,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumb
  er,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export default class CreateUserDTO {
  // 必选项描述
  @ApiProperty({ description: '用户姓名', default: '二狗' }) // 默认值设置
  @IsNotEmpty({ message: '姓名为必填项' })
  @IsString()
  @MinLength(2, { message: '姓名最小长度为2' })
  @MaxLength(10, { message: '姓名最大长度为10' })
  readonly name: string;

  @ApiProperty({ description: '年龄', default: '18' })
  @Type(() => Number)
  @IsNotEmpty({ message: '年龄为必填项' })
  @Min(10, { message: '年龄不能小于10岁' })
  @Max(80, { message: '年龄不能大于80岁' })
  readonly age: number;

  // 是否成年
  @Expose()
  isAdult(): boolean {
    return this.age > 18;
  }

  @ApiProperty({ description: '性别' })
  @IsNotEmpty({ message: '性别为必填项' })
  @IsEnum(['男', '女'], { message: '性别必须为男或女' }) // 枚举
  readonly sex: string;

  // 非必选描述
  @ApiPropertyOptional({ description: '学校', default: '清华大学' })
  @Contains('大学', { message: '学校必须为大学' })
  readonly school: string;

  @ApiPropertyOptional({ description: '邮件', default: 'test@gmail.com' })
  @IsNotEmpty({ message: '邮箱为必填项' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: '电话', default: '19102632828' })
  @IsNotEmpty({ message: '电话为必填项' })
  @IsPhoneNumber('CN', { message: '不是正确的中国手机号码' })
  readonly phone: number;
}
