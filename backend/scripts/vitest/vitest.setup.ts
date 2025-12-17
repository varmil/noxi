import { vi } from 'vitest'

// see: https://github.com/prisma/prisma/discussions/4655#discussioncomment-1414231
vi.mock('@prisma/generated/client', () => ({
  PrismaClient: function () {
    return { $executeRawUnsafe: vi.fn() }
  },
  Prisma: {
    sql: function () {
      return vi.fn()
    }
  }
}))

vi.mock('axios')

Object.assign(process.env, {
  SERVER_HOSTNAME: 'xxx',
  YOUTUBE_PUBSUB_SECRET: 'xxx'
})

console.log = () => {}
