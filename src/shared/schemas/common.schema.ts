import { Prop } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export default class CommonSchema extends Document {
    // 显示声明
    declare _id: mongoose.Schema.Types.ObjectId

    // 无需返回给前端响应的字段
    @Prop({
        select: false
    })
    declare __v: number

    @Prop({
        select: false
    })
    createdAt: Date

    @Prop({
        select: false
    })
    updatedAt: Date

    @Prop({
        required: false,
        select: false,
        default: false
    })
    isRemove: boolean
}
