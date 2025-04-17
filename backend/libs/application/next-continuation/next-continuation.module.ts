import { Module } from '@nestjs/common'
import { NextContinuationsService } from '@app/next-continuation/next-continuations.service'
import { NextContinuationInfraModule } from '@infra/next-continuation/next-continuation.infra.module'

@Module({
  imports: [NextContinuationInfraModule],
  providers: [NextContinuationsService],
  exports: [NextContinuationInfraModule, NextContinuationsService]
})
export class NextContinuationModule {}
