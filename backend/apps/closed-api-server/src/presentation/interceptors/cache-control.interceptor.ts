import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import type { Response, Request } from 'express'

/**
 * GETメソッドに'Cache-Control': 'public, max-age=1800' をセット
 */
export class CacheControlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request: Request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()

    if (request.method === 'GET') {
      if (!response.getHeader('Cache-Control')) {
        response.header('Cache-Control', 'public, max-age=1800')
      }
    }

    return next.handle()
  }
}
