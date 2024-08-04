import { Injectable } from '@nestjs/common'
import { initializeFirebaseAdmin } from 'apps/closed-api-server/src/application/lib/function/initializeFirebaseAdmin'

@Injectable()
export class FirebaseAdminSDKService {
  constructor() {
    initializeFirebaseAdmin()
  }
}
