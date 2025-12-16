import {
  Author,
  DisplayName,
  ProfileImageUrl,
  IsChatSponsor
} from '@domain/author'
import { GroupId } from '@domain/group'
import { Count, IsGift, Membership } from '@domain/membership'
import { ChannelId, PublishedAt, VideoId } from '@domain/youtube'
import { LiveChatMessageId } from '@domain/youtube/live-chat-message'
import type { StreamMembership as PrismaMembership } from '@prisma/generated/client'

export class MembershipTranslator {
  constructor(private readonly row: PrismaMembership) {}

  translate(): Membership {
    const row = this.row

    return new Membership({
      id: new LiveChatMessageId(row.id),
      count: new Count(row.count),
      isGift: new IsGift(row.isGift),

      author: new Author({
        channelId: new ChannelId(row.authorChannelId),
        displayName: new DisplayName(row.authorDisplayName),
        profileImageUrl: new ProfileImageUrl(row.authorProfileImageUrl),
        isChatSponsor: new IsChatSponsor(true) // とりあえず常にTRUE
      }),

      videoId: new VideoId(row.videoId),
      group: new GroupId(row.group),
      createdAt: new PublishedAt(row.createdAt)
    })
  }
}
