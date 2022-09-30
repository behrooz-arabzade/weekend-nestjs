import { WEvent } from '../event/event.entity';
import { Place } from '../place/place.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => WEvent, (event) => event.tags)
  events: WEvent[];

  @ManyToMany(() => Place, (place) => place.tags)
  places: Place[];
}
