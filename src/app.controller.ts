import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from 'modules/auth/auth.service';
import { Public } from 'modules/auth/decorators/public.decorator';
import { LocalAuthGuard } from 'modules/auth/guards/local-auth.guard';
import { LoginBody } from 'modules/auth/interfaces';

@Controller()
@ApiTags('default')
export class AppController {
  constructor(private authService: AuthService) { }

  // Use public to make the route public for anonymous users
  @Public()
  @Get('test')
  publicPath() {
    return 'tested';
  }
}
