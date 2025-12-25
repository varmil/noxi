import KeyvRedis from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Keyv from 'keyv'
import { deserialize, serialize } from './bigint-serializer'

/**
 * キャッシュモジュールの設定
 *
 * - 本番環境: REDIS_URL が設定されている場合は Redis を使用
 * - ローカル: インメモリキャッシュ（Keyv デフォルト）を使用
 *
 * BigInt値を含むデータも正しくシリアライズ/デシリアライズされる
 * 環境ごとにキーのprefixを分けることで、キーの重複を防ぐ
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
        stores: [
          new Keyv({
            store: new KeyvRedis(redisUrl),
            namespace,
            serialize,
            deserialize
          })
        ]
      }
    }

    return {
      stores: [new Keyv({ namespace, serialize, deserialize })]
    }
  }
})
