import {
  
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  
} from '@nestjs/common'
import { GetAllCheerTickets } from '@presentation/cheer-tickets/dto/GetAllCheerTickets.dto'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { CheerTicketsService } from '@app/cheer-tickets/cheer-tickets.service'
import { User } from '@domain/user'

@Controller('cheer-tickets')
export class CheerTicketsController {
  constructor(private readonly cheerTicketsService: CheerTicketsService) {}

  @Get('')
  async getAll(@Query() dto: GetAllCheerTickets) {
    return await this.cheerTicketsService.findAll({
      where: {
        userIds: dto.toUserIds(),
        totalCount: dto.toTotalCount()
      },
      orderBy: dto.toOrderBy(),
      limit: dto.toLimit(),
      offset: dto.toOffset()
    })
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getByUserId(@Req() req: { user: User }) {
    return await this.cheerTicketsService.findByUserId(req.user.id)
  }
}
