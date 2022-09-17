import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'entities/role/role.entity';
import { User } from 'entities/user/user.entity';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { getRandomString } from './utils';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([User, Role]),
      ],
      providers: [
        UsersService,
        {
          // It will make all route protected by auth
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register by username', async () => {
    const username = `test_user_${getRandomString(5)}`;
    const { success } = await service.register(username, 'testpassword');
    expect(success).toBe(true);

    // TODO delete test user
  });

  it('register by email', async () => {
    const username = `test_email_${getRandomString(5)}@weekend.com`;
    const { success } = await service.register(username, 'testpassword');
    expect(success).toBe(true);

    // TODO delete test user
  });

  it('register by repeated username', async () => {
    const username = `test_user`;
    const { success, message } = await service.register(
      username,
      'testpassword',
    );
    expect(success).toBe(false);
    expect(message).toBe('Username exist');
  });

  it('register by repeated email', async () => {
    const username = `test_user@weekend.com`;
    const { success, message } = await service.register(
      username,
      'testpassword',
    );
    expect(success).toBe(false);
    expect(message).toBe('Email exist');
  });
});
