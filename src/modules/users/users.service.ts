import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User[]> {
    return await this.usersRepository.find({
      where: {
        username,
      },
    });
  }
}
