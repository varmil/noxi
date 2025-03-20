import { z } from 'zod'
import { DisplayName, IsChatSponsor, ProfileImageUrl } from '@domain/author'
import { ChannelId } from '@domain/youtube'
import { AuthorDetails } from '@domain/youtube/live-chat-message'
import {
  authorBadgesSchema,
  authorNameSchema,
  authorPhotoSchema
} from '@infra/service/youtubei/live_chat'

export abstract class BaseTranslator {
  protected createAuthorDetails(
    authorExternalChannelId: string,
    authorName: z.infer<typeof authorNameSchema>,
    authorPhoto: z.infer<typeof authorPhotoSchema>,
    authorBadges: z.infer<typeof authorBadgesSchema>
  ) {
    return new AuthorDetails({
      channelId: new ChannelId(authorExternalChannelId),
      displayName: new DisplayName(authorName?.simpleText ?? ''),
      profileImageUrl: new ProfileImageUrl(authorPhoto.thumbnails[0].url),
      isChatSponsor: new IsChatSponsor(this.isChatSponsor(authorBadges))
    })
  }

  protected isChatSponsor(badges: z.infer<typeof authorBadgesSchema>) {
    return !!badges?.some(
      badge =>
        badge.liveChatAuthorBadgeRenderer.tooltip.includes('Member') ||
        badge.liveChatAuthorBadgeRenderer.tooltip.includes('member')
    )
  }
}
