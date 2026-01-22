import { Module } from '@nestjs/common'
import { GoldenTimesController } from '@presentation/insights/golden-times/golden-times.controller'
import { GoldenTimesModule } from '@app/golden-times/golden-times.module'

@Module({
  imports: [GoldenTimesModule],
  controllers: [GoldenTimesController],
  providers: []
})
export class GoldenTimesPresentationModule {}
