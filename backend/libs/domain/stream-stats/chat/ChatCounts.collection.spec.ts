import { ChatCountsFixture } from '@domain/stream-stats'

describe('ChatCounts', () => {
  describe('bundle()', () => {
    it('should bundle createdAt correctly', () => {
      const result = ChatCountsFixture.bundle()
      expect(
        result.map(({ createdAt }) => createdAt.toISOString())
      ).toStrictEqual([
        '2024-09-28T03:50:00.000Z',
        '2024-09-28T03:51:00.000Z',
        '2024-09-28T03:52:00.000Z',
        '2024-09-28T03:53:00.000Z'
      ])
    })

    it('should bundle all, member correctly', () => {
      const result = ChatCountsFixture.bundle()
      expect(
        result.map(({ all, member }) => ({
          all: all.get(),
          member: member.get()
        }))
      ).toStrictEqual([
        { all: 12, member: 7 },
        { all: 7, member: 5 },
        { all: 6, member: 4 },
        { all: 3, member: 2 }
      ])
    })

    it('should be idempotent if bundle is called multiple times', () => {
      const r1 = ChatCountsFixture.bundle()
      const result = r1.bundle()
      expect(
        result.map(({ createdAt }) => createdAt.toISOString())
      ).toStrictEqual([
        '2024-09-28T03:50:00.000Z',
        '2024-09-28T03:51:00.000Z',
        '2024-09-28T03:52:00.000Z',
        '2024-09-28T03:53:00.000Z'
      ])
    })

    it('should be idempotent if bundle is called multiple times', () => {
      const r1 = ChatCountsFixture.bundle()
      const result = r1.bundle()
      expect(
        result.map(({ all, member }) => ({
          all: all.get(),
          member: member.get()
        }))
      ).toStrictEqual([
        { all: 12, member: 7 },
        { all: 7, member: 5 },
        { all: 6, member: 4 },
        { all: 3, member: 2 }
      ])
    })
  })
})
