import { Module } from '@nestjs/common'
import { YoutubeDataApiInfraModule } from '@infra/service/youtube-data-api/youtube-data-api.infra.module'
import { ChannelRepositoryImpl } from '@infra/youtube/Channel.repository-impl'
import { VideoRepositoryImpl } from '@infra/youtube/Video.repository-impl'

@Module({
  imports: [YoutubeDataApiInfraModule],
  providers: [
    ChannelRepositoryImpl,
    { provide: 'ChannelRepository', useClass: ChannelRepositoryImpl },
    VideoRepositoryImpl,
    { provide: 'VideoRepository', useClass: VideoRepositoryImpl }
  ],
  exports: [
    YoutubeDataApiInfraModule,
    ChannelRepositoryImpl,
    { provide: 'ChannelRepository', useClass: ChannelRepositoryImpl },
    VideoRepositoryImpl,
    { provide: 'VideoRepository', useClass: VideoRepositoryImpl }
  ]
})
export class YoutubeInfraModule {}
