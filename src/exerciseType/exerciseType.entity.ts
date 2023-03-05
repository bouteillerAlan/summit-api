import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class ExerciseType {
  @PrimaryGeneratedColumn()
  id: number;

  /* link */
  @ManyToOne(type => User, user => user.id)
  owner: number;

  /* identity data */
  @Column({ type: 'varchar', unique: true })
  name: string;
}
