import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { OptionalJwtAuthGuard } from '@presentation/nestjs/guard/auth/optional-jwt-auth.guard'
import { FeatureInterestsService } from '@app/feature-interests/feature-interests.service'
import { User } from '@domain/user'
import { PostFeatureInterest } from './dto/PostFeatureInterest.dto'

@Controller('feature-interests')
export class FeatureInterestsController {
  constructor(
    private readonly featureInterestsService: FeatureInterestsService
  ) {}

  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  async create(
    @Req() req: { user?: User },
    @Body() dto: PostFeatureInterest
  ): Promise<void> {
    await this.featureInterestsService.create({
      userId: req.user?.id,
      featureId: dto.toFeatureId(),
      comment: dto.toComment()
    })
  }
}
