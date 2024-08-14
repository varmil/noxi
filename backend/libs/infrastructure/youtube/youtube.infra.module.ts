import { Module } from '@nestjs/common'
import { PrismaInfraModule } from '@infra/service/prisma/prisma.infra.module'
import { YoutubeDataApiInfraModule } from '@infra/service/youtube-data-api/youtube-data-api.infra.module'
import { ChannelRepositoryImpl } from '@infra/youtube/Channel.repository-impl'
import { CountryRepositoryImpl } from '@infra/youtube/Country.repository-impl'
import { VideoRepositoryImpl } from '@infra/youtube/Video.repository-impl'
import { VideoAggregationRepositoryImpl } from '@infra/youtube/VideoAggregation.repository-impl'
import { StreamRepositoryImpl } from '@infra/youtube/stream/Stream.repository-impl'

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

    StreamRepositoryImpl,
    { provide: 'StreamRepository', useClass: StreamRepositoryImpl },

    VideoRepositoryImpl,
    { provide: 'VideoRepository', useClass: VideoRepositoryImpl },

    VideoAggregationRepositoryImpl,
    {
      provide: 'VideoAggregationRepository',
      useClass: VideoAggregationRepositoryImpl
    }
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

    StreamRepositoryImpl,
    { provide: 'StreamRepository', useClass: StreamRepositoryImpl },

    VideoRepositoryImpl,
    { provide: 'VideoRepository', useClass: VideoRepositoryImpl },

    VideoAggregationRepositoryImpl,
    {
      provide: 'VideoAggregationRepository',
      useClass: VideoAggregationRepositoryImpl
    }
  ]
})
export class YoutubeInfraModule {}
