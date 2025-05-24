import { Filter } from 'glin-profanity'
import { ReservedUsernames } from './ReservedUsernames'

export const isUsernameReserved = (username: string) => {
  const lowerInput = username.toLowerCase()
  return Array.from(ReservedUsernames).some(reservedUsername =>
    lowerInput.includes(reservedUsername)
  )
}

/** 日本語＋英語いちおう両方対応（英語の判定が厳しい） */
export const getProfanityFilterForJapanese = () => {
  return new Filter({
    languages: ['japanese', 'english'],
    caseSensitive: false,
    wordBoundaries: false, // これが重要
    logProfanity: true
  })
}

export const getProfanityFilterForEnglish = () => {
  return new Filter({
    languages: ['english'],
    caseSensitive: false,
    logProfanity: true
  })
}
