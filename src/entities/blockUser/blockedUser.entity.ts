import { User } from 'entities/user/user.entity';
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class BlockedUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.blockedUsers)
  user: User;

  @ManyToOne(() => User)
  blockedUser: User;
}
