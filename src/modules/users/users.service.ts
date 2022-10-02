import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getUsernameFromEmail, isEmail, isMobile, getUuid } from './utils';
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
  ) { }

  async register(username: string, password: string): Promise<any> {
    const user = new User();

    try {
      // user.password = sha1(password);
      user.password = password;
      user.role = await this.getUserRole();

      if (isEmail(username)) {
        // TODO handle email
        if (await this.isEmailExist(username)) {
          throw new HttpException("Email exist", HttpStatus.CONFLICT);
        }

        user.username = await this.getValidUsernameFromEmail(username);
        user.email = username;
      } else {
        if (await this.isUsernameExist(username)) {
          throw new HttpException('Username exist', HttpStatus.CONFLICT);
        }

        user.username = username;
      }

      await this.usersRepo.insert(user);

      return {
        success: true,
        message: "User created successfully",
        username: user.username
      };
    } catch (error) {
      console.log("register catch error", error)

      if (error instanceof HttpException)
        throw error

      throw new HttpException('Server error, contact povider', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async forgetPassword(emailOrMobile: string): Promise<any> {
    try {
      if (isEmail(emailOrMobile)) {
        if (!await this.isEmailExist(emailOrMobile, false)) {
          throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
        }

        let resetPasswordSecret = getUuid();

        await this.usersRepo
          .createQueryBuilder()
          .update(User)
          .set({ resetPasswordSecret })
          .where("email = :email", { email: emailOrMobile })
          .execute()

        // TODO get email template
        const emailText = `To reset your password click on this link: http://weekend.app/reset-password?secret=${resetPasswordSecret}`

        // TODO send email

        return {
          success: true,
          message: "Check your email please"
        }
      }
      else if (isMobile(emailOrMobile)) {
        if (!await this.isMobileExist(emailOrMobile, false)) {
          throw new HttpException('Mobile not found', HttpStatus.NOT_FOUND);
        }

        let resetPasswordSecret = getUuid();

        await this.usersRepo
          .createQueryBuilder()
          .update(User)
          .set({ resetPasswordSecret })
          .where("mobile = :mobile", { mobile: emailOrMobile })
          .execute()

        // TODO get sms template
        const emailText = `To reset your password click on this link: http://weekend.app/reset-password?secret=${resetPasswordSecret}`

        // TODO send sms

        return {
          success: true,
          message: "Check your sms's please"
        }
      }
      else {
        throw new HttpException('Data is not valid', HttpStatus.BAD_REQUEST);
      }
    }
    catch (error) {
      console.log("forgetPassword catch error", error)

      if (error instanceof HttpException)
        throw error

      throw new HttpException('Server error, contact provider', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(username: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: {
        username,
      },
    });

    return user;
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
    delete user.resetPasswordSecret
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

  private async isMobileExist(mobile: string, checkVerification: boolean = true): Promise<boolean> {
    let count = await this.usersRepo.count({
      where: { mobile, ...(checkVerification ? { isMobileVerified: true } : {}) },
    })

    return count > 0
  }

  private async isEmailExist(email: string, checkVerification: boolean = true): Promise<boolean> {
    let count = await this.usersRepo.count({
      where: { email, ...(checkVerification ? { isEmailVerified: true } : {}) },
    })

    return count > 0
  }

  private async isUsernameExist(username: string): Promise<boolean> {
    let count = await this.usersRepo.count({
      where: { username },
    })

    console.log("isUsernameExist", count, count > 0)
    return count > 0
  }
}
