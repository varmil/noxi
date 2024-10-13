import { INestApplicationContext } from '@nestjs/common'
import { StructuredLogger } from '@ubie/nslog'

const logLevel = 'debug'
const format = process.env.ENV_NAME === 'production' ? 'json' : 'text'

export const useLogger = (app: INestApplicationContext) => {
  if (process.env.NODE_ENV === 'test') {
    app.useLogger(['error'])
    return
  }

  app.useLogger(new StructuredLogger({ logLevel, format }))
}
