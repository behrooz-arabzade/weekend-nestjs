import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReportType } from './interfaces';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.reports, {
    nullable: true,
  })
  user: User;

  @Column({
    type: 'enum',
    enum: ReportType,
    default: ReportType.User,
  })
  type: ReportType;

  @Index('I_targetId', { unique: false })
  @Column()
  targetId: number;
}
