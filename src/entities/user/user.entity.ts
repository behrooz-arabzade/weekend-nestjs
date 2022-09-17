import { BlockedUser } from 'entities/blockUser/blockedUser.entity';
import { City } from 'entities/city/city.entity';
import { WEvent } from 'entities/event/event.entity';
import { FriendUser } from 'entities/friendUser/friendUser.entity';
import { ParticipantComment } from 'entities/participantComment/participantComment.entity';
import { Post } from 'entities/post/post.entity';
import { Reaction } from 'entities/reaction/reaction.entity';
import { Recommendation } from 'entities/recommendation/recommendation';
import { Report } from 'entities/report/report.entity';
import { Role } from 'entities/role/role.entity';
import { UserTag } from 'entities/userTag/userTag.entity';
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

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  mobile?: string;

  @Column()
  isMobileVerified: boolean;

  @Column()
  email?: string;

  @Column()
  isEmailVerified: boolean;

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
