import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { FriendType } from './interfaces';

@Entity()
export class FriendUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.friends)
  user: User;

  @ManyToOne(() => User)
  friend: User;

  @Column({
    type: 'enum',
    enum: FriendType,
    default: FriendType.Normal,
  })
  type: FriendType;
}
