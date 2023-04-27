import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateUserDTO {
  // name
  // age
  // school
  // email
  // 电话
  // 是否成年

  // 必选项描述
  @ApiProperty({ description: '用户姓名' })
  @IsNotEmpty({ message: '姓名为必填项' })
  readonly name: string;

  @ApiProperty({ description: '作者' })
  @IsNotEmpty({ message: '缺少作者信息' })
  readonly author: string;

  // 可选项描述
  @ApiPropertyOptional({ description: '内容' })
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  @IsNumber()
  @ApiProperty({ description: '文章类型' })
  readonly type: number;
}
