export const GroupStrings = [
  'hololive',
  'nijisanji',
  'vspo',
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
  'kizuna-ai',
  'independent',
  'independent-irl'
] as const

export type GroupString = (typeof GroupStrings)[number]
