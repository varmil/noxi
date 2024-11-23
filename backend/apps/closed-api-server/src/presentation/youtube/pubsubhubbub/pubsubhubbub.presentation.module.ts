import { Module } from '@nestjs/common'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubController } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.controller'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { StreamsModule } from '@app/streams/streams.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { PubsubhubbubScenario } from './pubsubhubbub.scenario'
import { LibAppModule } from '@app/lib/lib.app.module'
import { ChatBundleQueuesModule } from '@app/chat-bundle-queues/chat-bundle-queues.module'
import { SupersBundleQueuesModule } from '@app/supers-bundle-queues/supers-bundle-queues.module'

@Module({
  imports: [
    LibAppModule,
    ChatBundleQueuesModule,
    SupersBundleQueuesModule,
    GroupsAppModule,
    StreamsModule,
    YoutubeAppModule
  ],
  controllers: [PubsubhubbubController],
  providers: [PubsubhubbubScenario, CryptoService]
})
export class PubsubhubbubPresentationModule {}
