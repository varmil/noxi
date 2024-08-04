import { NestFactory } from '@nestjs/core'
import { ChannelsScenario } from '@app/youtube/channels/channels.scenario'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { ChannelId } from '@domain/youtube'
import { HololiveSaveAggregationsByChannelModule } from './hololive-save-aggregations-by-channel.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(
    HololiveSaveAggregationsByChannelModule
  )
  const channelsScenario = app.select(YoutubeAppModule).get(ChannelsScenario)
  const videos = await channelsScenario.getVideosInChannel({
    where: { channelId: new ChannelId('UC-hM6YJuNYVAmUWxeIr9FeA') }
  })
  console.log(videos.items.map(e => e.snippet.title))
}
bootstrap().catch(reason => console.error(reason))
