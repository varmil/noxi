import { NestFactory } from '@nestjs/core'
import { SaveChannelsScenario } from 'apps/hololive/save-aggregations-by-channel/src/save-channels.scenario'
import { HololiveSaveAggregationsByChannelModule } from './save-aggregations-by-channel.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(
    HololiveSaveAggregationsByChannelModule
  )

  // チャンネル基本情報のUPSERT
  {
    const saveChannelsScenario = app
      .select(HololiveSaveAggregationsByChannelModule)
      .get(SaveChannelsScenario)
    await saveChannelsScenario.execute()
  }

  // TODO: AggregationのUPSERT

  // {
  //   const channelsScenario = app.select(YoutubeAppModule).get(ChannelsScenario)
  //   const videos = await channelsScenario.getVideosInChannel({
  //     where: { channelId: new ChannelId('UC-hM6YJuNYVAmUWxeIr9FeA') }
  //   })
  //   console.log(videos.items.map(e => e.snippet.title))
  // }

  await app.close()
}
bootstrap().catch(reason => console.error(reason))
