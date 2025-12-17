import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

// in only Local, load .env, in other environments, directly embed with Cloud Run
if (!process.env.DATABASE_URL) {
  config({ path: path.join(__dirname, '.env') })
}

const databaseUrl = process.env.DATABASE_URL

export default defineConfig({
  schema: 'prisma/schema',
  migrations: {
    path: 'prisma/migrations'
  },
  ...(databaseUrl && {
    datasource: {
      url: databaseUrl
    }
  })
})
