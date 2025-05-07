import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ClosedApiServerModule } from './closed-api-server.module'
import { registerGlobals } from './registerGlobals'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    ClosedApiServerModule,
    { rawBody: true }
  )
  registerGlobals(app)

  await app.listen(process.env.PORT || 15000)
}
bootstrap().catch(reason => console.error(reason))
