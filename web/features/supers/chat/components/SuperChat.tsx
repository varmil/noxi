import { PropsWithoutRef } from 'react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import { SuperChatSchema } from 'apis/youtube/schema/superChatSchema'
import CommentAvatar from 'components/comment/comment/CommentAvatar'
import {
  CommentContainer,
  CommentMain
} from 'components/comment/comment/CommentContainer'
import CommentContent from 'components/comment/comment/CommentContent'
import { CommentFooter } from 'components/comment/comment/CommentFooter'
import {
  CommentHeader,
  CommentHeaderItem,
  CommentHeaderWeakLine
} from 'components/comment/comment/CommentHeader'
import { CommentStreamLink } from 'components/comment/styles/CommentStreamLink'
import SuperTierIcon from 'features/supers/components/SuperTierIcon'

type Props = PropsWithoutRef<{
  chat: SuperChatSchema
  stream?: StreamSchema
}>

export default async function SuperChat({ chat, stream }: Props) {
  const {
    amountMicros,
    currency,
    amountDisplayString,
    tier,
    userComment,
    author,
    createdAt
  } = chat

  const format = await getFormatter()
  const t = await getTranslations('Features.supers')

  return (
    <CommentContainer>
      <CommentAvatar
        profileImageUrl={author.profileImageUrl}
        displayName={author.displayName}
      />
      <CommentMain>
        <CommentHeader>
          <CommentHeaderItem>
            <CommentHeaderWeakLine>{author.displayName}</CommentHeaderWeakLine>
            <CommentHeaderWeakLine>
              {format.dateTime(createdAt, {
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </CommentHeaderWeakLine>
          </CommentHeaderItem>
          <CommentHeaderItem className="flex items-center gap-x-1 text-lg font-bold tabular-nums">
            <SuperTierIcon tier={tier} />
            <span className="sr-only">{t('amount')}</span>
            {amountDisplayString}
          </CommentHeaderItem>
        </CommentHeader>
        <CommentContent>{userComment}</CommentContent>
        {stream && (
          <CommentFooter>
            <CommentStreamLink stream={stream} />
          </CommentFooter>
        )}
      </CommentMain>
    </CommentContainer>
  )
}
