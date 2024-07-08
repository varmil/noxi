import { NestFactory } from '@nestjs/core'
import { ClosedApiServerModule } from './closed-api-server.module'

async function bootstrap() {
  const app = await NestFactory.create(ClosedApiServerModule)

  app.enableCors()

  /**
   * /api/* にすべてマッピング
   */
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT || 15000)
}
bootstrap().catch(reason => console.error(reason))
