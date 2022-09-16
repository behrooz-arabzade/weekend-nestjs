import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async profile(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    this.safeUser(user);

    return user;
  }

  safeUser(user: User): void {
    delete user.password;
  }
}
