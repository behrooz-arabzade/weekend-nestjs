import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AuthModule } from 'modules/auth/auth.module';
import { UsersModule } from 'modules/users/users.module';
import { BlockedUser } from 'entities/blockUser/blockedUser.entity';
import { City } from 'entities/city/city.entity';
import { WEvent } from 'entities/event/event.entity';
import { FriendUser } from 'entities/friendUser/friendUser.entity';
import { ParticipantComment } from 'entities/participantComment/participantComment.entity';
import { Permission } from 'entities/permission/permission.entity';
import { Place } from 'entities/place/place.entity';
import { Post } from 'entities/post/post.entity';
import { Reaction } from 'entities/reaction/reaction.entity';
import { Recommendation } from 'entities/recommendation/recommendation.entity';
import { Report } from 'entities/report/report.entity';
import { Role } from 'entities/role/role.entity';
import { Tag } from 'entities/tag/tag.entity';
import { User } from 'entities/user/user.entity';
import { UserTag } from 'entities/userTag/userTag.entity';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        BlockedUser,
        City,
        WEvent,
        FriendUser,
        ParticipantComment,
        Permission,
        Place,
        Post,
        Reaction,
        Recommendation,
        Report,
        Role,
        Tag,
        User,
        UserTag,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
