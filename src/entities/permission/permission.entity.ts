import { Role } from '../role/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => Role, (userTag) => userTag.permissions)
  roles: Role[];
}
