import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  service_id: number;
}