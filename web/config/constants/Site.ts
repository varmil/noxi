export const GroupStrings = [
  'hololive',
  'hololive-english',
  'hololive-indonesia',
  'nijisanji-en',
  'idol-corp',
  'vspo',
  'independent',
  'independent-irl'
] as const

export type GroupString = (typeof GroupStrings)[number]
