import {
  Controller,
  Request,
  Body,
  UseGuards,
  Post,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginBody } from './interfaces';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginBody: LoginBody) {
    console.log('login', loginBody, req.user);
    return this.authService.login(req.user);
  }

  @Public()
  @Get()
  test() {
    return 'tested';
  }
}
