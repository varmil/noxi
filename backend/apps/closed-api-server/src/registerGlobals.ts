import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

export function registerGlobals(app: NestExpressApplication) {
  app.useBodyParser('json', { limit: '10mb' })

  app.useBodyParser('text', { type: 'application/atom+xml' })
  app.useBodyParser('text', { type: 'application/rss+xml' })
  app.useBodyParser('text', { type: 'application/xml' })
  app.useBodyParser('text', { type: 'text/xml' })

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  /**
   * /api/* にすべてマッピング
   */
  app.setGlobalPrefix('api')

  // Starts listening for shutdown hooks
  app.enableShutdownHooks()
}