import { BlockedUser } from '../blockUser/blockedUser.entity';
import { City } from '../city/city.entity';
import { WEvent } from '../event/event.entity';
import { FriendUser } from '../friendUser/friendUser.entity';
import { ParticipantComment } from '../participantComment/participantComment.entity';
import { Post } from '../post/post.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Recommendation } from '../recommendation/recommendation.entity';
import { Report } from '../report/report.entity';
import { Role } from '../role/role.entity';
import { UserTag } from '../userTag/userTag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
@Index('I_mobile_isMobileVerified', ['mobile', 'isMobileVerified'], {
  unique: true,
})
@Index('I_email_isEmailVerified', ['email', 'isEmailVerified'], {
  unique: true,
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('I_username', { unique: true })
  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, { cascade: true })
  role: Role;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column({ default: false })
  isMobileVerified: boolean;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true, unique: true })
  resetPasswordSecret?: string;

  @ManyToOne(() => City)
  currentCity?: City;

  @OneToMany(() => UserTag, (userTag) => userTag.user, { cascade: true })
  favoriteTags: UserTag[];

  @OneToMany(() => WEvent, (event) => event.owner, { cascade: true })
  ownEvents: WEvent[];

  @ManyToMany(() => WEvent, (event) => event.participants)
  @JoinTable()
  registeredEvents: WEvent[];

  @OneToMany(() => ParticipantComment, (pComment) => pComment.user, {
    cascade: true,
  })
  eventComments: ParticipantComment[];

  @OneToMany(() => Post, (post) => post.owner, { cascade: true })
  posts: Post[];

  @OneToMany(() => Reaction, (reaction) => reaction.user, { cascade: true })
  reactions: Reaction[];

  @OneToMany(() => FriendUser, (friend) => friend.user, { cascade: true })
  friends: FriendUser[];

  @OneToMany(() => BlockedUser, (block) => block.user, { cascade: true })
  blockedUsers: BlockedUser[];

  @OneToMany(() => Report, (message) => message.user, { cascade: true })
  reports: Report[];

  @OneToMany(() => Recommendation, (recom) => recom.user)
  recommendationsRecieved: Recommendation[];

  @OneToMany(() => Recommendation, (recom) => recom.referrerUser, {
    cascade: true,
  })
  recommendationsGiven: Recommendation[];
}
