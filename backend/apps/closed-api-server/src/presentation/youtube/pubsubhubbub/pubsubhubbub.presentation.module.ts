import { Module } from '@nestjs/common'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubController } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.controller'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { PubsubhubbubScenario } from './pubsubhubbub.scenario'

@Module({
  imports: [GroupsAppModule, YoutubeAppModule],
  controllers: [PubsubhubbubController],
  providers: [PubsubhubbubScenario, CryptoService]
})
export class PubsubhubbubPresentationModule {}
