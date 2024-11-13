import {
  BadRequestException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import compression from 'compression'
import { useLogger } from '@app/lib/function/useLogger'

export function registerGlobals(app: NestExpressApplication) {
  app.useBodyParser('json', { limit: '10mb' })

  app.useBodyParser('text', { type: 'application/atom+xml' })
  app.useBodyParser('text', { type: 'application/rss+xml' })
  app.useBodyParser('text', { type: 'application/xml' })
  app.useBodyParser('text', { type: 'text/xml' })

  useLogger(app)

  app.enableCors()
  app.use(compression())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.error(JSON.stringify(validationErrors, null, 2))
        return new BadRequestException(validationErrors)
      }
    })
  )

  /**
   * /api/* にすべてマッピング
   */
  app.setGlobalPrefix('api')

  // Starts listening for shutdown hooks
  app.enableShutdownHooks()
}
