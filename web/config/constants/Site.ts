export const GroupStrings = [
  'hololive',
  'nijisanji',
  'vspo',
  'neo-porte',
  'specialite',
  'mixstgirls',
  'hololive-english',
  'hololive-indonesia',
  'nijisanji-en',
  'idol-corp',
  'independent',
  'independent-irl'
] as const

export type GroupString = (typeof GroupStrings)[number]
