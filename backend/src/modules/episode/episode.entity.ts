import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ep_number: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  media_id: number;
}