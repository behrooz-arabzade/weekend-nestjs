import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'modules/auth/auth.service';
import { Public } from 'modules/auth/decorators/public.decorator';

@Controller()
@ApiTags('default')
export class AppController {
  constructor(private authService: AuthService) {}

  // Use public to make the route public for anonymous users
  @Public()
  @Get('test')
  publicPath() {
    return 'tested';
  }
}
