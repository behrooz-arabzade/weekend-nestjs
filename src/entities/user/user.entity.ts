import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BlockedUser } from '../blockUser/blockedUser.entity';
import { City } from '../city/city.entity';
import { WEvent } from '../event/event.entity';
import { FriendUser } from '../friendUser/friendUser.entity';
import { Report } from '../report/report.entity';
import { ParticipantComment } from '../participantComment/participantComment.entity';
import { Post } from '../post/post.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Role } from '../role/role.entity';
import { UserTag } from '../userTag/userTag.entity';
import { Recommendation } from '../recommendation/recommendation';

@Entity()
@Index('I_mobile_isMobileVerified', ['mobile', 'isMobileVerified'], {
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

  @Column()
  firstName: string;

  @ManyToOne(() => Role)
  role: Role;

  @Column()
  lastName: string;

  @Column()
  mobile: string;

  @ManyToOne(() => City)
  currentCity: City;

  @Column()
  isMobileVerified: boolean;

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
