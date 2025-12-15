const GROUPS_USING_GENDER: string[] = [
  'nijisanji',
  'neo-porte',
  'nijisanji-en',
  'independent',
  'independent-irl'
] as const

/**
 * 主にCanonical URLを作るために使う
 * group未指定の場合はTRUEなので注意（総合ランキングなので）
 *
 * @returns { boolean } そのグループが男女両方を含む場合はtrue
 */
export default function groupUsingGender(group?: string): boolean {
  if (!group) return true
  return GROUPS_USING_GENDER.includes(group)
}
