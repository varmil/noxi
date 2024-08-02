import { neon } from '@neondatabase/serverless'
import { Module } from '@nestjs/common'
import { config } from 'dotenv'

// Load Environment Variables
config({
  path: ['.env', '.env.production', '.env.local']
})

const sql = neon(process.env.DATABASE_URL)

const dbProvider = {
  provide: 'POSTGRES_POOL',
  useValue: sql
}

@Module({
  providers: [dbProvider],
  exports: [dbProvider]
})
export class PrismaInfraModule {}
