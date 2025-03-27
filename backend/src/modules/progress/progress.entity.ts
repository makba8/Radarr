import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  percentage: number;

  @Column({ nullable: true })
  media_id: number;

  @Column({ nullable: true })
  user_id: number;
}