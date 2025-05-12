import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { JwtAuthGuard } from '@presentation/nestjs/guard/auth/jwt-auth.guard'
import { UsersService } from '@app/users/users.service'
import { User } from '@domain/user'

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getUserById(@Req() req: { user: User }) {
    return await this.usersService.findById(req.user.id)
  }

  @Delete('me')
  async deleteUser(@Req() req: { user: User }) {
    return await this.usersService.deleteById(req.user.id)
  }
}
