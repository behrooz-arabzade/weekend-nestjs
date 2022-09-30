import {
  Controller,
  Request,
  Body,
  UseGuards,
  Post,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginBody } from './interfaces';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginBody })
  async login(@Request() req) {
    console.log('login1', {});
    return this.authService.login(req.user);
  }
}
