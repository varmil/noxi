import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MainScenario } from 'apps/bundle-chat-events/src/scenario/main.scenario'
import { MainService } from 'apps/bundle-chat-events/src/service/main.service'
import { SaveMembershipBundleService } from 'apps/bundle-chat-events/src/service/save-membership-bundle.service'
import { SaveSupersBundleService } from 'apps/bundle-chat-events/src/service/save-supers-bundle.service'
import { ChatEventsBundleQueuesModule } from '@app/chat-events-bundle-queues/chat-events-bundle-queues.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { MembershipBundlesAppModule } from '@app/membership-bundles/membership-bundles.module'
import { MembershipPricesAppModule } from '@app/membership-prices/membership-prices.app.module'
import { MembershipsModule } from '@app/memberships/memberships.module'
import { StreamsModule } from '@app/streams/streams.module'
import { SuperChatsModule } from '@app/super-chats/super-chats.module'
import { SuperStickersModule } from '@app/super-stickers/super-stickers.module'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    StreamsModule,
    ChatEventsBundleQueuesModule,
    SupersBundlesAppModule,
    MembershipBundlesAppModule,
    MembershipPricesAppModule,
    MembershipsModule,
    SuperChatsModule,
    SuperStickersModule
  ],
  providers: [
    MainScenario,
    MainService,
    SaveSupersBundleService,
    SaveMembershipBundleService
  ]
})
export class MainModule {}
