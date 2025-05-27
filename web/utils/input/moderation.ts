'use server'

import { randomUUID } from 'crypto'
import { openai } from 'lib/openai'

export async function checkModeration(text: string): Promise<boolean> {
  if (!text) return true

  console.time(`checkModeration:${text}`)
  try {
    const result = await openai.moderations.create({
      model: 'omni-moderation-latest',
      input: text
    })

    const flagged = result.results[0].flagged
    return !flagged // 問題なければ true
  } catch (err) {
    console.error('Moderation API Error:', err)
    return true // エラー時は通過扱い
  } finally {
    console.timeEnd(`checkModeration:${text}`)
  }
}

export async function checkImageModeration(
  url?: string | null
): Promise<boolean> {
  if (!url) return true

  const uuid = randomUUID().slice(0, 8)
  console.time(`checkImageModeration:${uuid}`)
  try {
    const result = await openai.moderations.create({
      model: 'omni-moderation-latest',
      input: [{ type: 'image_url', image_url: { url } }]
    })

    const flagged = result.results[0].flagged
    return !flagged // 問題なければ true
  } catch (err) {
    console.error('Moderation API Error:', err)
    return true // エラー時は通過扱い
  } finally {
    console.timeEnd(`checkImageModeration:${uuid}`)
  }
}
