import { Module } from '@nestjs/common'
import { GoldenTimesService } from '@app/golden-times/golden-times.service'
import { GoldenTimeInfraModule } from '@infra/golden-time/golden-time.infra.module'

@Module({
  imports: [GoldenTimeInfraModule],
  providers: [GoldenTimesService],
  exports: [GoldenTimeInfraModule, GoldenTimesService]
})
export class GoldenTimesModule {}
