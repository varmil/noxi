import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common'
import { CreateGroupDto } from '@presentation/group/dto/CreateGroup.dto'
import { UpdateGroupDto } from '@presentation/group/dto/UpdateGroup.dto'
import { GroupsService } from '@app/groups/groups.service'
import { GroupEntity, GroupId } from '@domain/group'

@Controller('groups')
@UseInterceptors(ClassSerializerInterceptor)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async findAll() {
    return await this.groupsService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const group = await this.groupsService.findById(new GroupId(id))
    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }
    return group
  }

  @Post()
  async create(@Body() dto: CreateGroupDto) {
    // 既存のGroupがある場合は409を返す
    const existing = await this.groupsService.findById(dto.toGroupId())
    if (existing) {
      throw new ConflictException(
        `Group with id ${dto.toGroupId().get()} already exists`
      )
    }

    const group = new GroupEntity({
      id: dto.toGroupId(),
      name: dto.toGroupName(),
      iconSrc: dto.toGroupIconSrc()
    })

    await this.groupsService.create(group)
    return group
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGroupDto) {
    const groupId = new GroupId(id)
    const existing = await this.groupsService.findById(groupId)
    if (!existing) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }

    await this.groupsService.update(groupId, {
      name: dto.toGroupName(),
      iconSrc: dto.toGroupIconSrc()
    })

    return await this.groupsService.findById(groupId)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const groupId = new GroupId(id)
    const existing = await this.groupsService.findById(groupId)
    if (!existing) {
      throw new NotFoundException(`Group with id ${id} not found`)
    }

    await this.groupsService.delete(groupId)
    return { message: `Group with id ${id} deleted successfully` }
  }
}
