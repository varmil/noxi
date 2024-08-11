import { Injectable } from '@nestjs/common'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'

/**
 * callbackを扱う
 */
@Injectable()
export class PubsubhubbubScenario {
  constructor(private readonly cryptoService: CryptoService) {}

  handleCallback({ xml }: { xml: object }) {
    console.log('handleCallback', xml)
  }
}
