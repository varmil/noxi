import { NestFactory } from '@nestjs/core'
import { MainScenario } from 'apps/groups/update-channels/src/main.scenario'
import { MainModule } from './main.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MainModule)

  // チャンネル基本情報のUPSERT
  {
    const updateChannelsScenario = app.select(MainModule).get(MainScenario)
    await updateChannelsScenario.execute()
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
