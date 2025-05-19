'use server'

import { openai } from 'lib/openai'

export async function checkModeration(text: string): Promise<boolean> {
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
  }
}
