import { User } from 'entities/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
