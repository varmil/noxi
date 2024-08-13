import { Module } from '@nestjs/common'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubController } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.controller'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { PubsubhubbubScenario } from './pubsubhubbub.scenario'

@Module({
  imports: [YoutubeAppModule],
  controllers: [PubsubhubbubController],
  providers: [PubsubhubbubScenario, CryptoService]
})
export class PubsubhubbubPresentationModule {}
