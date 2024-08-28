import { Module } from '@nestjs/common'
import { ChartsScenario } from '@app/groups/charts/charts.scenario'
import { GroupsService } from '@app/groups/groups.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { GroupInfraModule } from '@infra/group/group.infra.module'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [GroupInfraModule, YoutubeInfraModule],
  controllers: [],
  providers: [ChartsScenario, ChannelsService, GroupsService],
  exports: [ChartsScenario, GroupsService]
})
export class GroupsAppModule {}
