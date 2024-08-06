import { createHmac, type BinaryLike } from 'crypto'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class PubsubhubbubGuard implements CanActivate {
  // response適当だが大丈夫か？
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const res = context.switchToHttp().getResponse<Response>()

    const signature = req.headers['x-hub-signature'] as string
    const key = process.env.YOUTUBE_PUBSUB_SECRET

    if (!signature) {
      console.warn('Header x-hub-signature is not present')
      return false
    }

    if (!key) {
      console.warn('YOUTUBE_PUBSUB_SECRET is not set')
      return false
    }

    return this.verify({ key, data: req.body as BinaryLike, signature })
  }

  verify({
    key,
    data,
    signature
  }: {
    key: string
    data: BinaryLike
    signature: string
  }) {
    const hmac = createHmac('sha1', key)
    hmac.update(data)
    const expected = hmac.digest('hex')

    if (expected !== signature.split('=')[1]) {
      console.warn('Invalid request signature')
      return false
    }

    return true
  }
}
