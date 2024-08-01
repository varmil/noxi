import { Module } from '@nestjs/common'
import { HealthController } from '@app/health/health.controller'

@Module({
  imports: [],
  controllers: [HealthController],
  providers: []
})
export class HealthModule {}
