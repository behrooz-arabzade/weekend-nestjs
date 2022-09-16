import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @ManyToOne(() => User, (user) => user.reactions)
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions)
  post: Post;
}
