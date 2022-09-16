import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WEvent } from '../event/event.entity';
import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('jsonb', { nullable: false, default: [], array: true })
  pics: string[];

  @OneToOne(() => WEvent, (event) => event.post, { nullable: true })
  @JoinColumn()
  event: WEvent;

  @ManyToOne(() => User, (user) => user.posts)
  owner: User;

  @OneToMany(() => Reaction, (reaction) => reaction.post, { cascade: true })
  reactions: Reaction[];
}
