import KeyvRedis from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Keyv from 'keyv'
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

// BigInt対応のカスタムシリアライザ
interface DeserializedData<Value> {
  value?: Value
  expires?: number | undefined
}

const serialize = <Value>(data: DeserializedData<Value>): string => {
  return JSON.stringify(data, (_key, value: unknown) =>
    typeof value === 'bigint' ? { __bigint__: value.toString() } : value
  )
}

const deserialize = <Value>(
  data: string
): DeserializedData<Value> | undefined => {
  return JSON.parse(data, (_key, value: unknown) => {
    if (
      value &&
      typeof value === 'object' &&
      '__bigint__' in value &&
      typeof (value as { __bigint__: unknown }).__bigint__ === 'string'
    ) {
      return BigInt((value as { __bigint__: string }).__bigint__)
    }
    return value
  }) as DeserializedData<Value>
}

@Module({
  imports: [
    // in only Local, load .env , in other environments, directly embed with Cloud Run
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL')
        // 本番環境: Redis を使用
        if (redisUrl) {
          return {
            stores: [
              new Keyv({
                store: new KeyvRedis(redisUrl),
                serialize,
                deserialize
              })
            ]
          }
        }
        // ローカル: インメモリキャッシュ（デフォルト）
        return {
          stores: [new Keyv({ serialize, deserialize })]
        }
      }
    }),
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
