import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors
} from '@nestjs/common'
import { GroupsService } from '@app/groups/groups.service'

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async findAll() {
    return this.groupsService.findAll()
  }
}
