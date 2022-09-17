import {
  Controller,
  UseGuards,
  Post,
  Get,
  Request,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './modules/auth/auth.service';
import { Public } from './modules/auth/decorators/public.decorator';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';

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
