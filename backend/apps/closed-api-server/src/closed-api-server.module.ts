import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ChannelRegistrationsPresentationModule } from '@presentation/channel-registrations/channel-registrations.presentation.module'
import { CloudSchedulersPresentationModule } from '@presentation/cloud-schedulers/cloud-schedulers.presentation.module'
import { ExchangeRatesPresentationModule } from '@presentation/exchange-rates/exchange-rates.presentation.module'
import { GroupsPresentationModule } from '@presentation/group/groups.presentation.module'
import { GroupRegistrationsPresentationModule } from '@presentation/group-registrations/group-registrations.presentation.module'
import { HealthController } from '@presentation/health/health.controller'
import { HyperChatRankingsPresentationModule } from '@presentation/hyper-chat-rankings/hyper-chat-rankings.presentation.module'
import { HyperChatTicketsPresentationModule } from '@presentation/hyper-chat-tickets/hyper-chat-tickets.presentation.module'
import { HyperChatsPresentationModule } from '@presentation/hyper-chats/hyper-chats.presentation.module'
import { HyperTrainsPresentationModule } from '@presentation/hyper-trains/hyper-trains.presentation.module'
import { InactiveChannelsPresentationModule } from '@presentation/inactive-channels/inactive-channels.presentation.module'
import { InsightsPresentationModule } from '@presentation/insights/insights.presentation.module'
import { LoginBonusesPresentationModule } from '@presentation/login-bonuses/login-bonuses.presentation.module'
import { MembershipBundlesPresentationModule } from '@presentation/membership-bundles/membership-bundles.presentation.module'
import { MembershipSummariesPresentationModule } from '@presentation/membership-summaries/membership-summaries.presentation.module'
import { SupersPresentationModule } from '@presentation/supers/supers.presentation.module'
import { SupersBundlesPresentationModule } from '@presentation/supers-bundles/supers-bundles.presentation.module'
import { SupersRankingsPresentationModule } from '@presentation/supers-rankings/supers-rankings.presentation.module'
import { SupersSnapshotsPresentationModule } from '@presentation/supers-snapshots/supers-snapshots.presentation.module'
import { SupersSummariesPresentationModule } from '@presentation/supers-summaries/supers-summaries.presentation.module'
import { UserProfilesPresentationModule } from '@presentation/user-profiles/user-profiles.presentation.module'
import { UsersPresentationModule } from '@presentation/users/users.presentation.module'
import { WebhooksStripePresentationModule } from '@presentation/webhooks/stripe/webhooks-stripe.presentation.module'
import { XPresentationModule } from '@presentation/x/x.presentation.module'
import { YoutubePresentationModule } from '@presentation/youtube/youtube.presentation.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { AppCacheModule, CacheTTLRequiredInterceptor } from './cache'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    AppCacheModule,
    LibAppModule,
    ChannelRegistrationsPresentationModule,
    InactiveChannelsPresentationModule,
    CloudSchedulersPresentationModule,
    ExchangeRatesPresentationModule,
    GroupsPresentationModule,
    GroupRegistrationsPresentationModule,
    HyperChatRankingsPresentationModule,
    HyperChatsPresentationModule,
    HyperChatTicketsPresentationModule,
    HyperTrainsPresentationModule,
    LoginBonusesPresentationModule,
    MembershipBundlesPresentationModule,
    MembershipSummariesPresentationModule,
    SupersPresentationModule,
    SupersBundlesPresentationModule,
    SupersRankingsPresentationModule,
    SupersSnapshotsPresentationModule,
    SupersSummariesPresentationModule,
    UserProfilesPresentationModule,
    UsersPresentationModule,
    WebhooksStripePresentationModule,
    InsightsPresentationModule,
    YoutubePresentationModule,
    XPresentationModule
  ],
  controllers: [HealthController],
  providers: [
    // インターセプターの登録順序が重要:
    // Response path では逆順で実行される（後に登録したものが先に実行）
    // ClassSerializerInterceptor → CacheInterceptor の順で実行させるため
    // CacheInterceptor を先に登録する
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheTTLRequiredInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class ClosedApiServerModule {}
