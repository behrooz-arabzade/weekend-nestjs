import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WEvent } from '../event/event.entity';
import { User } from '../user/user.entity';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  rate: number;

  @ManyToOne(() => User, (user) => user.recommendationsRecieved)
  user: User;

  @ManyToOne(() => User, (user) => user.recommendationsGiven)
  referrerUser: User;
}
