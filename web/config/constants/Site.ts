export const GroupStrings = [
  'hololive',
  'hololive-english',
  'hololive-indonesia'
] as const

export type GroupString = (typeof GroupStrings)[number]
