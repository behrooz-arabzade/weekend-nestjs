import { WEvent } from 'entities/event/event.entity';
import { User } from 'entities/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
