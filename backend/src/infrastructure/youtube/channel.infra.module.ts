import { Module } from '@nestjs/common'
import { YoutubeDataApiInfraModule } from '@infra/service/youtube-data-api/youtube-data-api.infra.module'
import { ChannelRepositoryImpl } from '@infra/youtube/Channel.repository-impl'

@Module({
  imports: [YoutubeDataApiInfraModule],
  providers: [
    ChannelRepositoryImpl,
    { provide: 'ChannelRepository', useClass: ChannelRepositoryImpl }
  ],
  exports: [
    YoutubeDataApiInfraModule,
    ChannelRepositoryImpl,
    { provide: 'ChannelRepository', useClass: ChannelRepositoryImpl }
  ]
})
export class ChannelInfraModule {}
