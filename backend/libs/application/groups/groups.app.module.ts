import { Module } from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'
import { ChannelsService } from '@app/youtube/channels/channels.service'
import { GroupInfraModule } from '@infra/group/group.infra.module'
import { YoutubeInfraModule } from '@infra/youtube/youtube.infra.module'

@Module({
  imports: [GroupInfraModule, YoutubeInfraModule],
  controllers: [],
  providers: [ChannelsService, GroupsService],
  exports: [GroupInfraModule, YoutubeInfraModule, GroupsService]
})
export class GroupsAppModule {}
