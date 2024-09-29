import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { YoutubeDataApiInfraModule } from '@infra/service/youtube-data-api/youtube-data-api.infra.module'
import { ChannelRepositoryImpl } from '@infra/youtube/Channel.repository-impl'
import { CountryRepositoryImpl } from '@infra/youtube/Country.repository-impl'
import { VideoRepositoryImpl } from '@infra/youtube/Video.repository-impl'

@Module({
  imports: [PrismaInfraModule, YoutubeDataApiInfraModule],
  providers: [
    ChannelRepositoryImpl,
    {
      provide: 'ChannelRepository',
      useClass: ChannelRepositoryImpl
    },

    CountryRepositoryImpl,
    { provide: 'CountryRepository', useClass: CountryRepositoryImpl },

    VideoRepositoryImpl,
    { provide: 'VideoRepository', useClass: VideoRepositoryImpl }
  ],
  exports: [
    PrismaInfraModule,
    YoutubeDataApiInfraModule,

    ChannelRepositoryImpl,
    {
      provide: 'ChannelRepository',
      useClass: ChannelRepositoryImpl
    },

    CountryRepositoryImpl,
    { provide: 'CountryRepository', useClass: CountryRepositoryImpl },

    VideoRepositoryImpl,
    { provide: 'VideoRepository', useClass: VideoRepositoryImpl }
  ]
})
export class YoutubeInfraModule {}
