export const GroupStrings = [
  'hololive',
  'nijisanji',
  'vspo',
  'mixstgirls',
  'neo-porte',
  'dotlive',
  'first-stage',
  'varium',
  'voms',
  'utatane',
  'holostars',
  'noripro',
  'trillionstage',
  'aogiri-high-school',
  '774inc',
  'specialite',
  'hololive-english',
  'hololive-indonesia',
  'nijisanji-en',
  'idol-corp',
  'kizuna-ai',
  'independent',
  'independent-irl'
] as const

export type GroupString = (typeof GroupStrings)[number]
