import { Module } from '@nestjs/common'
import { YoutubeDataApiInfrastructureModule } from '@infra/service/youtube-data-api/youtube-data-api.infrastructure.module'
import { ChannelRepositoryImpl } from '@infra/youtube/Channel.repository-impl'

@Module({
  imports: [YoutubeDataApiInfrastructureModule],
  providers: [
    ChannelRepositoryImpl,
    { provide: 'ChannelRepository', useClass: ChannelRepositoryImpl }
  ],
  exports: [
    YoutubeDataApiInfrastructureModule,
    ChannelRepositoryImpl,
    { provide: 'ChannelRepository', useClass: ChannelRepositoryImpl }
  ]
})
export class ChannelInfrastructureModule {}
