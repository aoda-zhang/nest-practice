import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDoc = User & Document;
@Schema()
export class User extends Document {
    // 指定唯一值
    @Prop({ unique: true })
    userId: string;

    @Prop({
        required: true,
        trim: true, // 两边去空
        minlength: 2 // 最小长度为2
    })
    name: string;

    @Prop({ required: true })
    age: number;

    // 全局转换为大写
    @Prop({ type: String, enum: ['North', 'South'], default: 'North', uppercase: true })
    sex: string;

    // select 为false，表示不给前端返回
    @Prop({ select: false })
    school: string;

    // 正则匹配邮件格式
    @Prop({
        required: true,
        match: /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+.)+[A-Za-z]{2,6}$/
    })
    email: string;

    @Prop({ required: true })
    phone: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
