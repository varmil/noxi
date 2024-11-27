import { Module } from '@nestjs/common'
import { GroupsController } from '@presentation/group/groups.controller'
import { GroupsAppModule } from '@app/groups/groups.app.module'

@Module({
  imports: [GroupsAppModule],
  controllers: [GroupsController],
  providers: []
})
export class GroupsPresentationModule {}
