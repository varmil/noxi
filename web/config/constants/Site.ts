export const GroupStrings = [
  'hololive',
  'hololive-english',
  'hololive-indonesia',
  'independent',
  'independent-irl'
] as const

export type GroupString = (typeof GroupStrings)[number]
