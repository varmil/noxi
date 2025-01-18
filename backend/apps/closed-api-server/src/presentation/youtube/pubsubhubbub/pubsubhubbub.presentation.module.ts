import { Module } from '@nestjs/common'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubController } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.controller'
import { ChatBundleQueuesModule } from '@app/chat-bundle-queues/chat-bundle-queues.module'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { StreamsModule } from '@app/streams/streams.module'
import { SupersBundleQueuesModule } from '@app/supers-bundle-queues/supers-bundle-queues.module'
import { PubsubhubbubAppModule } from '@app/youtube/pubsubhubbub/pubsubhubbub.app.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { PubsubhubbubScenario } from './pubsubhubbub.scenario'

@Module({
  imports: [
    LibAppModule,
    ChatBundleQueuesModule,
    SupersBundleQueuesModule,
    GroupsAppModule,
    PubsubhubbubAppModule,
    StreamsModule,
    YoutubeAppModule
  ],
  controllers: [PubsubhubbubController],
  providers: [PubsubhubbubScenario, CryptoService]
})
export class PubsubhubbubPresentationModule {}
