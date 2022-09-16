import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  profile(@Request() req) {
    return this.usersService.profile(req.user.username);
  }
}
