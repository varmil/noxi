import { mockDeep } from 'jest-mock-extended'
import type {
  PrismaClient as OriginalPrismaClient,
  Prisma as OriginalPrisma
} from '@prisma/generated/client'

// see: https://github.com/prisma/prisma/discussions/4655#discussioncomment-1414231
jest.mock('@prisma/generated/client', () => ({
  PrismaClient: function () {
    return mockDeep<OriginalPrismaClient>()
  },
  Prisma: {
    sql: function () {
      return mockDeep<OriginalPrisma.Sql>()
    }
  }
}))

jest.mock('axios')

Object.assign(process.env, {
  SERVER_HOSTNAME: 'xxx',
  YOUTUBE_PUBSUB_SECRET: 'xxx'
})

console.log = () => {}
