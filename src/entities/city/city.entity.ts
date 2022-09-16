import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index('I_name_state', ['name', 'state'], { unique: true })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;

  @Column()
  isSupported: boolean;
}
