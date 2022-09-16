import { Controller, UseGuards, Post, Get, Request } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { Public } from './modules/auth/decorators/public.decorator';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Use public to make the route public for anonymous users
  @Public()
  @Get('empty')
  publicPath() {
    return [];
  }
}
