import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

config({ path: path.join(__dirname, '.env') })

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
