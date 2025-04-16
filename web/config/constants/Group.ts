export const GroupStrings = [
  'hololive',
  'nijisanji',
  'dotlive',
  'mixstgirls',
  'neo-porte',
  'vspo',
  'first-stage',
  'varium',
  'voms',
  'utatane',
  'holostars',
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
