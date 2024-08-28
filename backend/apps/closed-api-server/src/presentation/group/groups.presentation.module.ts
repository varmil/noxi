import { Module } from '@nestjs/common'
import { ChartsController } from '@presentation/group/charts.controller'
import { GroupsAppModule } from '@app/groups/groups.app.module'

@Module({
  imports: [GroupsAppModule],
  controllers: [ChartsController],
  providers: []
})
export class GroupsPresentationModule {}
