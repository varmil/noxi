// 重要: instrumentation は他の import より先に呼び出す
// eslint-disable-next-line import-x/order
import {
  startInstrumentation,
  shutdownInstrumentation
} from './instrumentation'
startInstrumentation()

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

  const server = await app.listen(process.env.PORT || 15000)
  server.on('close', () => {
    shutdownInstrumentation().catch(console.error)
  })
}
bootstrap().catch(reason => console.error(reason))
