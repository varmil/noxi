import { PropsWithoutRef } from 'react'
import { getFormatter, getTranslations } from 'next-intl/server'
import { CommentThreadsSchema } from 'apis/youtube/data-api/schema/commentThreadsSchema'
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

export default async function YoutubeComment({
  thread
}: PropsWithoutRef<{ thread: CommentThreadsSchema }>) {
  const {
    snippet: {
      topLevelComment: {
        snippet: {
          authorProfileImageUrl: profileImageUrl,
          authorDisplayName: displayName,
          textDisplay: userComment,
          likeCount,
          updatedAt
        }
      }
    }
  } = thread

  const format = await getFormatter()
  const t = await getTranslations('Features.youtube.comment')

  return (
    <CommentContainer>
      <CommentAvatar
        profileImageUrl={profileImageUrl}
        displayName={displayName}
      />
      <CommentMain>
        <CommentHeader>
          <CommentHeaderItem>
            <CommentHeaderWeakLine>{displayName}</CommentHeaderWeakLine>
            <CommentHeaderWeakLine>
              {format.relativeTime(updatedAt)}
            </CommentHeaderWeakLine>
          </CommentHeaderItem>
        </CommentHeader>
        <CommentContent>{userComment}</CommentContent>
        {likeCount && likeCount > 0 ? (
          <CommentFooter likes={likeCount} />
        ) : null}
      </CommentMain>
    </CommentContainer>
  )
}
