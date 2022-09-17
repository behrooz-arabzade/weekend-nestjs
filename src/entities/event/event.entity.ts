import { ParticipantComment } from 'entities/participantComment/participantComment.entity';
import { Place } from 'entities/place/place.entity';
import { Post } from 'entities/post/post.entity';
import { Tag } from 'entities/tag/tag.entity';
import { User } from 'entities/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import {
  AccountingType,
  IEventLimitation,
  ReservingState,
  WEventState,
} from './interfaces';

@Entity()
export class WEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.ownEvents)
  owner: User;

  @ManyToMany(() => User, (user) => user.registeredEvents)
  @JoinTable()
  participants: User[];

  @Column('jsonb', { nullable: false, default: {}, array: false })
  limitations: IEventLimitation;

  @ManyToOne(() => Place)
  place: Place;

  @Column({
    type: 'enum',
    enum: WEventState,
    default: WEventState.Ready,
  })
  state: WEventState;

  @Column({
    type: 'enum',
    enum: AccountingType,
    default: AccountingType.Shared,
  })
  accounting: AccountingType;

  @Column({
    type: 'enum',
    enum: ReservingState,
    default: ReservingState.NotReserved,
  })
  reservingState: ReservingState;

  @OneToMany(() => ParticipantComment, (pComment) => pComment.event, {
    cascade: true,
  })
  participantComments: ParticipantComment[];

  @OneToOne(() => Post, (post) => post.event, { nullable: true })
  post: Post;

  @ManyToMany(() => Tag, (tag) => tag.events)
  @JoinTable()
  tags: Tag[];
}
