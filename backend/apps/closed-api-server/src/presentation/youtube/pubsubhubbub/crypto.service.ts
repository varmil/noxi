import { createHmac, type BinaryLike } from 'crypto'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'

interface Args {
  req: Request
  res: Response
}

@Injectable()
export class CryptoService {
  verify({ req, res }: Args): boolean {
    const signature = req.headers['x-hub-signature'] as string
    const key = process.env.YOUTUBE_PUBSUB_SECRET

    {
      console.info('req.headers', JSON.stringify(req.headers))
      console.info('req.body', JSON.stringify(req.body))
    }

    if (!signature) {
      console.info('Header x-hub-signature is not present')
      res.status(HttpStatus.ACCEPTED).send()
      return false
    }

    if (!key) {
      console.info('YOUTUBE_PUBSUB_SECRET is not set')
      res.status(HttpStatus.ACCEPTED).send()
      return false
    }

    if (!this.digest({ key, data: req.body as BinaryLike, signature })) {
      res.status(HttpStatus.ACCEPTED).send()
      return false
    }

    return true
  }

  digest({
    key,
    data,
    signature
  }: {
    key: string
    data: string | object
    signature: string
  }) {
    try {
      const hmac = createHmac('sha1', key)
      hmac.update(this.toBuffer(data))
      const expected = hmac.digest('hex')

      if (expected !== signature.split('=')[1]) {
        console.info(
          'Invalid request signature',
          signature.split('=')[1],
          'expected',
          expected
        )
        return false
      }

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  private toBuffer(data: string | object) {
    if (Buffer.isBuffer(data)) return data
    if (typeof data === 'string') return Buffer.from(data)
    return Buffer.from(JSON.stringify(data))
  }
}
