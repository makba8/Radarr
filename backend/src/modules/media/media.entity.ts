import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tmdb_id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  status: string;
}