import { mockDeep } from 'jest-mock-extended'
import type {
  PrismaClient as OriginalPrismaClient,
  Prisma as OriginalPrisma
} from '@prisma/client'

// see: https://github.com/prisma/prisma/discussions/4655#discussioncomment-1414231
jest.mock('@prisma/client', () => ({
  PrismaClient: function () {
    return mockDeep<OriginalPrismaClient>()
  },
  Prisma: {
    sql: function () {
      return mockDeep<OriginalPrisma.Sql>()
    }
  }
}))
