import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'

import CommonSchema from './common.schema'

@Schema({ collection: DBCollection.HOSPITAL, timestamps: true })
export class Hospital extends CommonSchema {
    @Prop({
        required: true,
        unique: true,
        type: String
    })
    name: string
}
export const HospitalSchema = SchemaFactory.createForClass(Hospital)
