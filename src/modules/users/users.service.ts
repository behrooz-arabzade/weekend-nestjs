import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getUsernameFromEmail, isEmail, isMobile } from './utils';
import sha1 from 'sha1';
import { User } from 'entities/user/user.entity';
import { Role } from 'entities/role/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async register(username: string, password: string): Promise<any> {
    const user = new User();

    user.password = sha1(password);
    user.role = await this.getUserRole();

    if (isEmail(username)) {
      // TODO handle email
      if (this.isEmailExist(username)) {
        return {
          success: false,
          message: 'Email exist',
        };
      }

      user.username = await this.getValidUsernameFromEmail(username);
      user.email = username;
    } else {
      if (this.isUsernameExist(username)) {
        return {
          success: false,
          message: 'Username exist',
        };
      }

      user.username = username;
    }

    try {
      await this.usersRepo.insert(user);

      return {
        success: true,
      };
    } catch (error) {
      // TODO log error
      return {
        success: false,
        message: 'Server error, contact povider',
      };
    }
  }

  async profile(username: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: {
        username,
      },
    });

    this.safeUser(user);

    return user;
  }

  private safeUser(user: User): void {
    delete user.password;
  }

  private async getUserRole(): Promise<Role> {
    return await this.roleRepo.findOne({
      where: {
        title: 'user',
      },
    });
  }

  private async getValidUsernameFromEmail(email: string): Promise<string> {
    let username = getUsernameFromEmail(email);
    let isValid = false;
    let counter = 1;
    while (!isValid) {
      if (!(await this.usersRepo.count({ where: { username } }))) {
        isValid = true;
        break;
      }

      counter++;

      username += counter;
    }

    return username;
  }

  private async isMobileExist(mobile: string): Promise<boolean> {
    return (
      (await this.usersRepo.count({
        where: { mobile, isMobileVerified: true },
      })) > 0
    );
  }

  private async isEmailExist(email: string): Promise<boolean> {
    return (
      (await this.usersRepo.count({
        where: { email, isEmailVerified: true },
      })) > 0
    );
  }

  private async isUsernameExist(username: string): Promise<boolean> {
    return (
      (await this.usersRepo.count({
        where: { username },
      })) > 0
    );
  }
}
