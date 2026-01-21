import { Module } from '@nestjs/common'
import { ChannelCacheService } from '@presentation/youtube/pubsubhubbub/channel-cache.service'
import { CryptoService } from '@presentation/youtube/pubsubhubbub/crypto.service'
import { PubsubhubbubController } from '@presentation/youtube/pubsubhubbub/pubsubhubbub.controller'
import { ChatDeletingQueuesModule } from '@app/chat-deleting-queues/chat-deleting-queues.module'
import { ChatEventsBundleQueuesModule } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.module'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { StreamsModule } from '@app/streams/streams.module'
import { PubsubhubbubAppModule } from '@app/youtube/pubsubhubbub/pubsubhubbub.app.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { PubsubhubbubScenario } from './pubsubhubbub.scenario'

@Module({
  imports: [
    LibAppModule,
    ChatDeletingQueuesModule,
    ChatEventsBundleQueuesModule,
    GroupsAppModule,
    PubsubhubbubAppModule,
    StreamsModule,
    YoutubeAppModule
  ],
  controllers: [PubsubhubbubController],
  providers: [PubsubhubbubScenario, ChannelCacheService, CryptoService]
})
export class PubsubhubbubPresentationModule {}
