import { BadRequestException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import UserInfoDTO from '@modules/user/dto/userInfo.dto'
import { History } from '@shared/schemas/history.schema'

import CreateHistoryDto from './dto/create-history.dto'

@Injectable()
export class HistoryService {
    constructor(@InjectModel(DBCollection.HISTORY) private HistoryModal: Model<History>) {}

    async create(historyDto: CreateHistoryDto & UserInfoDTO) {
        try {
            if (historyDto) {
                const existingHistory = await this.HistoryModal.findOne({
                    spendDate: historyDto?.spendDate
                })
                if (
                    typeof existingHistory?.fareInfo === 'object' &&
                    typeof historyDto?.fareInfo === 'object' &&
                    existingHistory?.fareInfo &&
                    historyDto?.fareInfo &&
                    historyDto?.spendDate
                ) {
                    const newHistory = historyDto?.fareInfo ?? {}
                    await this.HistoryModal.updateOne(
                        { spendDate: historyDto?.spendDate },
                        {
                            $set: {
                                fareInfo: [existingHistory?.fareInfo, newHistory]
                            }
                        }
                    )
                } else {
                    await new this.HistoryModal(historyDto).save()
                }
                return true
            }
            throw new BadRequestException('无新的报销添加')
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
