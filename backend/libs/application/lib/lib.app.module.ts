import { Module } from '@nestjs/common'
import { FirebaseAdminSDKService } from './firebase-admin-sdk.service'

/** @deprecated  */
@Module({
  providers: [FirebaseAdminSDKService],
  exports: [FirebaseAdminSDKService],
  imports: []
})
export class LibAppModule {}
