import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            // u need set DB name when there has multiple DB
            // connectionName: 'serviceDB',
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get('serviceDB')?.uri ?? '',
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            },
            inject: [ConfigService]
        })
    ]
})
export default class DatabaseModule {}
