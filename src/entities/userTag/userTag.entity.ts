import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tag)
  tag: Tag;

  @ManyToOne(() => User, (user) => user.favoriteTags)
  user: User;

  @Column({ default: 5 })
  rate: number;
}
