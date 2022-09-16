import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { WEvent } from '../event/event.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => WEvent, (event) => event.tags)
  events: WEvent[];
}
