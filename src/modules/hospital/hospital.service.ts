import { BadRequestException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import { Hospital } from '@shared/schemas/hospital.schema'

@Injectable()
export class HospitalService {
    constructor(@InjectModel(DBCollection.HOSPITAL) private HospitalModal: Model<Hospital>) {}

    async create(hospitals: string[]) {
        // mogodb 批量更新
        const bulkOperations = []
        try {
            hospitals.forEach((item) => {
                bulkOperations.push({
                    updateOne: {
                        filter: { name: item },
                        update: { $setOnInsert: { name: item, isRemove: false } },
                        upsert: true
                    }
                })
            })
            if (bulkOperations?.length > 0) {
                const bulkRes = await this.HospitalModal.bulkWrite(bulkOperations)
                return bulkRes?.upsertedCount
            }
            return 0
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    getHospital(id = '') {
        // MongoDB collation can set specify local language
        try {
            return id
                ? this.HospitalModal.findOne({ _id: id, isRemove: false })
                : this.HospitalModal.find({ isRemove: false })
                      .collation({ locale: 'zh' })
                      ?.sort({ name: 1 })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async update(hospitals: string[], id?: string) {
        try {
            if (id) {
                await this.HospitalModal.findByIdAndUpdate(id, hospitals)
            } else {
                await this.HospitalModal.insertMany(hospitals)
            }
            return await this.getHospital()
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async remove(id: string) {
        try {
            return await this.HospitalModal.findByIdAndUpdate(id, { isRemove: true })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
