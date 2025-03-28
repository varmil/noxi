import { Injectable } from '@nestjs/common'
import { CountryCode, LanguageTag, Group } from '@domain'
import {
  AppliedAt,
  ChannelRegistration,
  ChannelRegistrationRepository,
  ChannelRegistrations,
  Status
} from '@domain/channel-registration'
import { Gender } from '@domain/lib'
import {
  ChannelId,
  ChannelTitle,
  LiveStreamCount,
  SubscriberCount
} from '@domain/youtube'
import { PrismaInfraService } from '@infra/service/prisma/prisma.infra.service'

@Injectable()
export class ChannelRegistrationRepositoryImpl
  implements ChannelRegistrationRepository
{
  constructor(private readonly prismaInfraService: PrismaInfraService) {}

  findAll: ChannelRegistrationRepository['findAll'] = async () => {
    const rows = await this.prismaInfraService.channelRegistration.findMany()
    return new ChannelRegistrations(
      rows.map(
        e =>
          new ChannelRegistration({
            channelId: new ChannelId(e.channelId),
            title: new ChannelTitle(e.title),
            country: new CountryCode(e.country),
            defaultLanguage: new LanguageTag(e.defaultLanguage),
            gender: new Gender(e.gender),
            group: new Group(e.group),
            subscriberCount: new SubscriberCount(e.subscriberCount),
            liveStreamCount: new LiveStreamCount(e.liveStreamCount),
            status: new Status(e.status),
            appliedAt: new AppliedAt(e.appliedAt)
          })
      )
    )
  }

  save: ChannelRegistrationRepository['save'] = async data => {
    await this.prismaInfraService.channelRegistration.upsert({
      where: { channelId: data.channelId.get() },
      update: {
        title: data.title.get(),
        country: data.country.get(),
        defaultLanguage: data.defaultLanguage.get(),
        gender: data.gender.get(),
        group: data.group.get(),
        subscriberCount: data.subscriberCount.get(),
        liveStreamCount: data.liveStreamCount.get(),
        status: data.status.get(),
        appliedAt: data.appliedAt.get()
      },
      create: {
        channelId: data.channelId.get(),
        title: data.title.get(),
        country: data.country.get(),
        defaultLanguage: data.defaultLanguage.get(),
        gender: data.gender.get(),
        group: data.group.get(),
        subscriberCount: data.subscriberCount.get(),
        liveStreamCount: data.liveStreamCount.get(),
        status: data.status.get(),
        appliedAt: data.appliedAt.get()
      }
    })
  }
}
