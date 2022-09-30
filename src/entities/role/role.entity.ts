import { Permission } from '../permission/permission.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Permission, (userTag) => userTag.roles, { cascade: true })
  @JoinTable()
  permissions: Permission[];
}
