'use server'

import { getTranslations } from 'next-intl/server'
import { getGroup } from './getGroup'

type Options = {
  /** 取得できなかった場合のエラーメッセージに使用するコンテキスト */
  errorContext?: string
}

/**
 * グループIDからグループ名を取得する
 * - groupId が 'all' の場合は i18n の翻訳を返す
 * - それ以外の場合は DB から取得したグループ名を返す
 */
export async function getGroupName(
  groupId: string,
  options?: Options
): Promise<string> {
  if (groupId === 'all') {
    const global = await getTranslations('Global')
    return global('group.all')
  }

  const group = await getGroup(groupId)
  if (!group) {
    const context = options?.errorContext ?? 'unknown'
    throw new Error(`Group not found for ${context}`)
  }

  return group.name
}
