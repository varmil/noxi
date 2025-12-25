// see: https://github.com/prisma/prisma/discussions/4655#discussioncomment-1414231
jest.mock('@prisma/generated/client', () => ({
  PrismaClient: function () {
    return { $executeRawUnsafe: jest.fn() }
  },
  Prisma: {
    sql: function () {
      return jest.fn()
    }
  }
}))

jest.mock('axios')

Object.assign(process.env, {
  SERVER_HOSTNAME: 'xxx',
  YOUTUBE_PUBSUB_SECRET: 'xxx'
})

console.log = () => {}
