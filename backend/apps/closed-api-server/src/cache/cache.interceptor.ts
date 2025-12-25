import { CacheInterceptor, CACHE_TTL_METADATA } from '@nestjs/cache-manager'
import { ExecutionContext, Injectable } from '@nestjs/common'

/**
 * @CacheTTL() が明示的に指定されている場合のみキャッシュを有効にするインターセプター
 *
 * NestJS のデフォルト CacheInterceptor は @CacheTTL() がなくてもキャッシュするが、
 * このカスタムインターセプターは @CacheTTL() デコレーターが
 * コントローラーまたはメソッドに付与されている場合のみキャッシュを行う。
 */
@Injectable()
export class CacheTTLRequiredInterceptor extends CacheInterceptor {
  protected override isRequestCacheable(context: ExecutionContext): boolean {
    // @CacheTTL() がコントローラーまたはメソッドに設定されているか確認
    const ttl = this.reflector.getAllAndOverride<number | undefined>(
      CACHE_TTL_METADATA,
      [context.getHandler(), context.getClass()]
    )

    // @CacheTTL() が設定されていない場合はキャッシュしない
    if (ttl === undefined || ttl === null) {
      return false
    }

    // 親クラスのキャッシュ可能判定を実行（GETリクエストかどうかなど）
    return super.isRequestCacheable(context)
  }
}
