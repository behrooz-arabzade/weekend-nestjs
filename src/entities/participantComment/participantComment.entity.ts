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
export class ParticipantComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  rate: number;

  @ManyToOne(() => User, (user) => user.eventComments)
  user: User;

  @ManyToOne(() => WEvent, (event) => event.participantComments)
  event: WEvent;
}
