import { Injectable } from '@nestjs/common'
import {
  AppliedAt,
  ChannelRegistration,
  ChannelRegistrationRepository,
  ChannelRegistrations,
  Status
} from '@domain/channel-registration'
import { CountryCode, LanguageTag } from '@domain/country'
import { GroupName } from '@domain/group'
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

  findAll: ChannelRegistrationRepository['findAll'] = async ({
    where,
    orderBy,
    limit,
    offset
  }) => {
    const rows = await this.prismaInfraService.channelRegistration.findMany({
      where: { status: where.status?.get() },
      orderBy,
      take: limit,
      skip: offset
    })
    return new ChannelRegistrations(
      rows.map(
        e =>
          new ChannelRegistration({
            channelId: new ChannelId(e.channelId),
            title: new ChannelTitle(e.title),
            country: new CountryCode(e.country),
            defaultLanguage: new LanguageTag(e.defaultLanguage),
            gender: new Gender(e.gender),
            group: new GroupName(e.group),
            subscriberCount: new SubscriberCount(e.subscriberCount),
            liveStreamCount: new LiveStreamCount(e.liveStreamCount),
            status: new Status(e.status),
            appliedAt: new AppliedAt(e.appliedAt)
          })
      )
    )
  }

  findById: ChannelRegistrationRepository['findById'] = async channelId => {
    const row = await this.prismaInfraService.channelRegistration.findUnique({
      where: { channelId: channelId.get() }
    })
    if (!row) return null
    return new ChannelRegistration({
      channelId: new ChannelId(row.channelId),
      title: new ChannelTitle(row.title),
      country: new CountryCode(row.country),
      defaultLanguage: new LanguageTag(row.defaultLanguage),
      gender: new Gender(row.gender),
      group: new GroupName(row.group),
      subscriberCount: new SubscriberCount(row.subscriberCount),
      liveStreamCount: new LiveStreamCount(row.liveStreamCount),
      status: new Status(row.status),
      appliedAt: new AppliedAt(row.appliedAt)
    })
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

  updateMany: ChannelRegistrationRepository['updateMany'] = async ({
    where,
    data
  }) => {
    await this.prismaInfraService.channelRegistration.updateMany({
      where: {
        channelId: { in: where.channelIds.map(c => c.get()) },
        status: where.status?.get()
      },
      data: { status: data.status.get() }
    })
  }
}
