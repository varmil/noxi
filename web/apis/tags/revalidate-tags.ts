/** スパチャバンドルの再検証タグ */
export const SUPERS_BUNDLES = 'supers-bundles'

/** スパチャランキングの再検証タグ */
export const SUPERS_RANKINGS = 'supers-rankings'
export const SUPERS_RANKINGS_HALF_HOURLY = 'supers-rankings-half-hourly'

/** スパチャサマリの再検証タグ */
export const SUPERS_SUMMARIES = 'supers-summaries'
export const SUPERS_SUMMARIES_HALF_HOURLY = 'supers-summaries-half-hourly'

/** ハイパーチャットの再検証タグ（チャンネルごと） */
export const getHyperChatTag = (channelId: string) =>
  `hyper-chat:${channelId}` as const

/** ハイパーチャット（最新一覧）の再検証タグ */
export const HYPER_CHATS_LATEST = 'hyper-chats-latest'

/** ハイパートレイン（アクティブ一覧）の再検証タグ */
export const HYPER_TRAINS_ACTIVE = 'hyper-trains-active'
