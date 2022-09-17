import { City } from 'entities/city/city.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => City)
  currentCity: City;

  @Column()
  address: string;

  @Column()
  location: string;

  @Column('simple-array', { nullable: false })
  phones: string[];

  @Column('jsonb', { nullable: false, default: {}, array: false })
  metadata: Record<string, string>;
}
