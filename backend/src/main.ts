import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  /**
   * /api/* にすべてマッピング
   */
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT || 15000)
}
bootstrap()
