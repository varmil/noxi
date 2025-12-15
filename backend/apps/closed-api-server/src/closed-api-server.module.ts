import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChannelRegistrationsPresentationModule } from '@presentation/channel-registrations/channel-registrations.presentation.module'
import { CheerTicketUsagesPresentationModule } from '@presentation/cheer-ticket-usages/cheer-ticket-usages.presentation.module'
import { CheerTicketsPresentationModule } from '@presentation/cheer-tickets/cheer-tickets.presentation.module'
import { CloudSchedulersPresentationModule } from '@presentation/cloud-schedulers/cloud-schedulers.presentation.module'
import { ExchangeRatesPresentationModule } from '@presentation/exchange-rates/exchange-rates.presentation.module'
import { GroupsPresentationModule } from '@presentation/group/groups.presentation.module'
import { GroupRegistrationsPresentationModule } from '@presentation/group-registrations/group-registrations.presentation.module'
import { HealthController } from '@presentation/health/health.controller'
import { LoginBonusesPresentationModule } from '@presentation/login-bonuses/login-bonuses.presentation.module'
import { MembershipBundlesPresentationModule } from '@presentation/membership-bundles/membership-bundles.presentation.module'
import { MembershipSummariesPresentationModule } from '@presentation/membership-summaries/membership-summaries.presentation.module'
import { SupersPresentationModule } from '@presentation/supers/supers.presentation.module'
import { SupersBundlesPresentationModule } from '@presentation/supers-bundles/supers-bundles.presentation.module'
import { SupersRankingsPresentationModule } from '@presentation/supers-rankings/supers-rankings.presentation.module'
import { SupersSummariesPresentationModule } from '@presentation/supers-summaries/supers-summaries.presentation.module'
import { UserProfilesPresentationModule } from '@presentation/user-profiles/user-profiles.presentation.module'
import { UsersPresentationModule } from '@presentation/users/users.presentation.module'
import { WebhooksStripePresentationModule } from '@presentation/webhooks/stripe/webhooks-stripe.presentation.module'
import { XPresentationModule } from '@presentation/x/x.presentation.module'
import { YoutubePresentationModule } from '@presentation/youtube/youtube.presentation.module'
import { LibAppModule } from '@app/lib/lib.app.module'

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    CacheModule.register({ isGlobal: true }),
    LibAppModule,
    ChannelRegistrationsPresentationModule,
    CheerTicketUsagesPresentationModule,
    CheerTicketsPresentationModule,
    CloudSchedulersPresentationModule,
    ExchangeRatesPresentationModule,
    GroupsPresentationModule,
    GroupRegistrationsPresentationModule,
    LoginBonusesPresentationModule,
    MembershipBundlesPresentationModule,
    MembershipSummariesPresentationModule,
    SupersPresentationModule,
    SupersBundlesPresentationModule,
    SupersRankingsPresentationModule,
    SupersSummariesPresentationModule,
    UserProfilesPresentationModule,
    UsersPresentationModule,
    WebhooksStripePresentationModule,
    YoutubePresentationModule,
    XPresentationModule
  ],
  controllers: [HealthController],
  providers: []
})
export class ClosedApiServerModule {}
