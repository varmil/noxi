import { Injectable, Logger } from '@nestjs/common'
import { PromiseService } from '@app/lib/promise-service'
import { MembershipsService } from '@app/memberships/memberships.service'
import { GroupName } from '@domain/group'
import { Membership } from '@domain/membership'
import { VideoId } from '@domain/youtube'
import { LiveChatMessages } from '@domain/youtube/live-chat-message'

@Injectable()
export class SaveMembershipsService {
  private readonly logger = new Logger(SaveMembershipsService.name)

  constructor(
    private readonly promiseService: PromiseService,
    private readonly membershipsService: MembershipsService
  ) {}

  async execute({
    videoId,
    newMessages,
    group
  }: {
    videoId: VideoId
    newMessages: LiveChatMessages
    group: GroupName
  }) {
    const promises = newMessages.map(async message => {
      if (!message.isMembership || !message.snippet.membershipDetails) return

      const { count, isGift } = message.snippet.membershipDetails

      this.logger.log({
        id: message.id.get(),
        videoId: videoId.get(),
        group: group.get(),
        membership: { count: count.get(), isGift: isGift.get() },
        author: message.authorDetails.displayName.get()
      })

      await this.membershipsService.save({
        data: new Membership({
          id: message.id,
          videoId,
          group,
          count,
          isGift,
          author: message.authorDetails,
          createdAt: message.snippet.publishedAt
        })
      })
    })

    await this.promiseService.allSettled(promises)
  }
}
