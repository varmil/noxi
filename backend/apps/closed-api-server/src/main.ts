import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ClosedApiServerModule } from './closed-api-server.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ClosedApiServerModule,
    { rawBody: true }
  )

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  /**
   * /api/* にすべてマッピング
   */
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT || 15000)
}
bootstrap().catch(reason => console.error(reason))
