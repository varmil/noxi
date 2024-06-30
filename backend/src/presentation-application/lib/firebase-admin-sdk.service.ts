import { Injectable } from '@nestjs/common'
import { initializeFirebaseAdmin } from '@app/lib/function/initializeFirebaseAdmin'

@Injectable()
export class FirebaseAdminSDKService {
  constructor() {
    initializeFirebaseAdmin()
  }
}
