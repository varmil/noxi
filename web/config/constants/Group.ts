export const GroupStrings = [
  'hololive',
  'nijisanji',
  'vspo',
  'kizuna-ai',
  'neo-porte',
  'holostars',
  'aogiri-high-school',
  '774inc',
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
