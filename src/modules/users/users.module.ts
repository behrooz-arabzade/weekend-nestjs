import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Module({
  providers: [
    UsersService,
    {
      // It will make all route protected by auth
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
