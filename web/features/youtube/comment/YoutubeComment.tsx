import { PropsWithoutRef } from 'react'
import { getFormatter } from 'next-intl/server'
import { CommentThreadsSchema } from 'apis/youtube/data-api/schema/commentThreadsSchema'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
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
import { CommentLikes } from 'components/comment/styles/CommentLikes'
import { CommentStreamLink } from 'components/comment/styles/CommentStreamLink'
import Bullet from 'components/styles/Bullet'

type Props = PropsWithoutRef<{
  thread: CommentThreadsSchema
  stream?: StreamSchema
}>

export default async function YoutubeComment({ thread, stream }: Props) {
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
  const showLikes = likeCount && likeCount > 0

  return (
    <CommentContainer>
      <CommentAvatar
        profileImageUrl={profileImageUrl}
        displayName={displayName}
      />
      <CommentMain>
        <CommentHeader>
          <CommentHeaderItem>
            <CommentHeaderWeakLine ellipsis>
              {displayName}
            </CommentHeaderWeakLine>
            <Bullet weak />
            <CommentHeaderWeakLine>
              {format.relativeTime(updatedAt)}
            </CommentHeaderWeakLine>
          </CommentHeaderItem>
        </CommentHeader>
        <CommentContent>{userComment}</CommentContent>
        {showLikes || stream ? (
          <CommentFooter>
            {showLikes ? <CommentLikes likes={likeCount} /> : null}
            {stream ? <CommentStreamLink stream={stream} /> : null}
          </CommentFooter>
        ) : null}
      </CommentMain>
    </CommentContainer>
  )
}
