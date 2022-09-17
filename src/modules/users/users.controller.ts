import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  profile(@Request() req) {
    return this.usersService.profile(req.user.username);
  }

  @Public()
  @Get()
  test() {
    return 'tested';
  }
}
