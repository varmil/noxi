export const GroupStrings = [
  'hololive',
  'hololive-english',
  'hololive-indonesia',
  'independent'
] as const

export type GroupString = (typeof GroupStrings)[number]
