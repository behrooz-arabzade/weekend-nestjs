import { Controller, Get, Request, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'modules/auth/decorators/public.decorator';
import { RegisterBody, ForgetPasswordBody } from './interfaces';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Public()
  @Post("register")
  async register(@Body() { username, password }: RegisterBody) {
    return await this.usersService.register(username, password);
  }

  @Public()
  @Post('forget-password')
  async forgetPassword(@Body() { emailOrMobile }: ForgetPasswordBody) {
    return await this.usersService.forgetPassword(emailOrMobile);
  }

  @Get('profile')
  async profile(@Request() req) {
    return await this.usersService.profile(req.user.username);
  }
}
