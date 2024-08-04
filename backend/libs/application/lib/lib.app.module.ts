import { Module } from '@nestjs/common'
import { FirebaseAdminSDKService } from './firebase-admin-sdk.service'

@Module({
  providers: [FirebaseAdminSDKService],
  exports: [FirebaseAdminSDKService],
  imports: []
})
export class LibAppModule {}
