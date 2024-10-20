import { IsIn, IsNotEmpty } from 'class-validator'
import { StringValueObject } from '@domain/lib/StringValueObject'

/**
 * chatEndedEvent                   – チャットが終了しました。このメッセージの後にメッセージを挿入することはできません。これは、ブロードキャストが終了してから少し後に自然に発生します。このタイプのメッセージは、チャンネルのデフォルトの配信におけるチャットで送信されません。
 * messageDeletedEvent              – メッセージがモデレーターによって削除されました。author フィールドには、モデレーターの詳細が表示されます。このイベントには表示コンテンツがありません。
 * sponsorOnlyModeEndedEvent        – チャットがスポンサー専用モードではなくなりました。つまり、スポンサーではないユーザーがメッセージを送信できるようになります。このイベントには表示コンテンツがありません。
 * sponsorOnlyModeStartedEvent      – チャットがスポンサー専用モードになっています。つまり、スポンサーのみがメッセージを送信できます。このイベントには表示コンテンツがありません。
 * newSponsorEvent                  – 新規ユーザーが、チャットを所有するチャンネルのスポンサーになったこと。author フィールドには、新しいスポンサーの詳細が含まれます。
 * memberMilestoneChatEvent         – ユーザーがメンバー マイルストーン チャットを送信しました。
 * superChatEvent                   – ユーザーが Super Chat を購入しました。
 * superStickerEvent                – ユーザーが Super Sticker を購入しました。
 * textMessageEvent                 – ユーザーがテキスト メッセージを送信しました。
 * tombstone                        – tombstone は、以前この ID と公開時刻のメッセージが存在していたものの、その後削除されたことを示します。メッセージの削除時に送信されるのではなく、メッセージが削除される前の場所を示すために表示されます。このタイプのメッセージには、snippet.liveChatId、snippet.type、snippet.publishedAt フィールドのみが含まれます。
 * userBannedEvent                  – ユーザーは管理メンバーによって参加禁止にされました。author フィールドには、モデレーターの詳細が表示されます。
 * membershipGiftingEvent           – ユーザーが他の視聴者のメンバーシップを購入しました。
 * giftMembershipReceivedEvent      – ユーザーがメンバーシップ ギフトを受け取りました。
 * pollDetails, pollEvent           – ユーザーがライブ アンケートを作成しました。
 */
export class Type extends StringValueObject {
  @IsIn([
    'chatEndedEvent',
    'messageDeletedEvent',
    'sponsorOnlyModeEndedEvent',
    'sponsorOnlyModeStartedEvent',
    'newSponsorEvent',
    'memberMilestoneChatEvent',
    'superChatEvent',
    'superStickerEvent',
    'textMessageEvent',
    'tombstone',
    'userBannedEvent',
    'membershipGiftingEvent',
    'giftMembershipReceivedEvent',
    'pollDetails',
    'pollEvent'
  ])
  @IsNotEmpty()
  protected readonly val: string

  constructor(val: string) {
    super(val)
    this.val = val
  }
}
