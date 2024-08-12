import { Injectable } from '@nestjs/common'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { UpdatedEntry } from '@domain/youtube'

/**
 * callbackを扱う
 */
@Injectable()
export class PubsubhubbubScenario {
  constructor(private readonly cryptoService: CryptoService) {}

  handleUpdatedCallback({ entry }: { entry: UpdatedEntry }) {
    console.log('handleUpdatedCallback', entry)
  }
}
