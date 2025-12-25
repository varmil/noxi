import KeyvRedis from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Keyv from 'keyv'

/**
 * キャッシュモジュールの設定
 *
 * - 本番環境: REDIS_URL が設定されている場合は Redis を使用
 * - ローカル: インメモリキャッシュ（Keyv デフォルト）を使用
 *
 * 環境ごとにキーのnamespaceを分けることで、キーの重複を防ぐ
 *
 * キャッシュを有効にしたいエンドポイントでは @CacheTTL() を使用する。
 * @CacheTTL() が指定されていないエンドポイントはキャッシュされない。
 *
 * 注: ClassSerializerInterceptor が CacheInterceptor より先に実行されるため、
 * キャッシュにはシリアライズ済み（primitive型）のデータが保存される。
 */
export const AppCacheModule = CacheModule.registerAsync({
  isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisUrl = configService.get<string>('REDIS_URL')
    const namespace = configService.get<string>('ENV_NAME') || 'local'

    if (redisUrl) {
      return {
        stores: [new Keyv({ store: new KeyvRedis(redisUrl), namespace })]
      }
    }

    return {
      stores: [new Keyv({ namespace })]
    }
  }
})
