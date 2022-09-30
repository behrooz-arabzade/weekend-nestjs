import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
