import { Module } from '@nestjs/common'

import HistoryModule from '@modules/history/history.module'
import SharedModule from '@shared/shared.module'
import ACLModule from '@modules/ACL/ACLs.module'
import AuthModule from '@modules/auth/auth.module'

import UserModule from './modules/user/user.module'
import { HospitalModule } from './modules/hospital/hospital.module'

@Module({
    imports: [SharedModule, UserModule, AuthModule, ACLModule, HospitalModule, HistoryModule],
    providers: []
})
export class AppModule {}
