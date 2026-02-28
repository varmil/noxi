import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GroupsAppModule } from '@app/groups/groups.app.module'
import { LibAppModule } from '@app/lib/lib.app.module'
import { SubscriberMilestoneAppModule } from '@app/subscriber-milestone/subscriber-milestone.app.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'
import { MainScenario } from './scenario/main.scenario'
import { XMilestoneService } from './service/x-milestone.service'

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: !!process.env.ENV_NAME }),
    LibAppModule,
    YoutubeAppModule,
    GroupsAppModule,
    SubscriberMilestoneAppModule
  ],
  providers: [MainScenario, XMilestoneService]
})
export class MainModule {}
