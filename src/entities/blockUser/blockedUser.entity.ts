import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class BlockedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.blockedUsers)
  user: User;

  @ManyToOne(() => User)
  blockedUser: User;
}
