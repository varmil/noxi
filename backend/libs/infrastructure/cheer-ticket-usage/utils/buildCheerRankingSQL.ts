import { RankingWhere } from '@domain/cheer-ticket-usage/CheerRanking.repository'
import { ChannelId } from '@domain/youtube'

interface SqlParams {
  text: string
  values: (string | number | Date)[]
}

export function buildWhereClause(
  where: RankingWhere & { channelId?: ChannelId },
  indexOffset = 1
): SqlParams {
  const conditions: string[] = []
  const values: (string | number | Date)[] = []
  let index = indexOffset

  if (where.group) {
    conditions.push(`"group" = $${index++}`)
    values.push(where.group.get())
  }
  if (where.gender) {
    conditions.push(`"gender" = $${index++}`)
    values.push(where.gender.get())
  }
  if (where.channelId) {
    conditions.push(`"channelId" = $${index++}`)
    values.push(where.channelId.get())
  }
  if (where.usedAt?.gte) {
    conditions.push(`"usedAt" >= $${index++}`)
    values.push(where.usedAt.gte)
  }
  if (where.usedAt?.lte) {
    conditions.push(`"usedAt" <= $${index++}`)
    values.push(where.usedAt.lte)
  }

  return {
    text: conditions.length ? conditions.join(' AND ') : '1=1',
    values
  }
}

export function buildLimitOffsetClause(
  limit?: number,
  offset?: number,
  startIndex = 1
): SqlParams {
  let text = ''
  const values: (string | number)[] = []
  let index = startIndex

  if (typeof limit === 'number') {
    text += ` LIMIT $${index++}`
    values.push(limit)
  }
  if (typeof offset === 'number') {
    text += ` OFFSET $${index++}`
    values.push(offset)
  }

  return { text, values }
}
