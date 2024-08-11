import { Injectable } from '@nestjs/common'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { XML } from '@domain/xml/XML.vo'

/**
 * callbackを扱う
 */
@Injectable()
export class PubsubhubbubScenario {
  constructor(private readonly cryptoService: CryptoService) {}

  handleCallback({ xml }: { xml: XML }) {
    console.log('handleCallback', xml)
  }
}
