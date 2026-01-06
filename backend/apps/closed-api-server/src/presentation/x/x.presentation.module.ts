import { Module } from '@nestjs/common'
import { XLast24HoursScenario } from '@presentation/x/x-last-24-hours.scenario'
import { XMonthlyScenario } from '@presentation/x/x-monthly.scenario'
import { XWeeklyScenario } from '@presentation/x/x-weekly.scenario'
import { XController } from '@presentation/x/x.controller'
import { SupersBundlesAppModule } from '@app/supers-bundles/supers-bundles.module'
import { SupersSnapshotsAppModule } from '@app/supers-snapshots/supers-snapshots.module'
import { YoutubeAppModule } from '@app/youtube/youtube.app.module'

@Module({
  imports: [SupersBundlesAppModule, SupersSnapshotsAppModule, YoutubeAppModule],
  controllers: [XController],
  providers: [XLast24HoursScenario, XWeeklyScenario, XMonthlyScenario]
})
export class XPresentationModule {}
