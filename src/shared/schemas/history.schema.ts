import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'

import { HistoryContent, HistoryContentSchema } from './historyContent.schema'
import CommonSchema from './common.schema'

@Schema({ collection: DBCollection.HISTORY, timestamps: true })
export class History extends CommonSchema {
    // 关联用户姓名和id
    @Prop({
        required: true
    })
    userName: string

    @Prop({
        required: false
    })
    userID?: string

    @Prop({
        required: true
    })
    spendDate: string

    // 依赖另一个数据模型
    @Prop({
        required: true,
        type: [HistoryContentSchema]
    })
    fareInfo: HistoryContent[]
}
export const HistorySchema = SchemaFactory.createForClass(History)
