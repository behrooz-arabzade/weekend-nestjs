import { Controller, Get, Request, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'modules/auth/decorators/public.decorator';
import { RegisterBody } from './interfaces';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async register(@Body() { username, password }: RegisterBody) {
    return await this.usersService.register(username, password);
  }

  @Get('profile')
  async profile(@Request() req) {
    return await this.usersService.profile(req.user.username);
  }

  @Public()
  @Get()
  test() {
    return 'tested';
  }
}
