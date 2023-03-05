import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Training } from '../training/training.entity';
import { ExerciseType } from '../exerciseType/exerciseType.entity';
import { User } from '../user/user.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  /* link */
  @ManyToOne(type => ExerciseType, exerciseType => exerciseType.id)
  type: number;

  @ManyToOne(type => Training, training => training.id)
  training: number;

  @ManyToOne(type => User, user => user.id)
  owner: number;

  /* current data */
  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int' })
  repetition: number;

  @Column({ type: 'int' })
  series: number;

  /* additional data */
  @Column({ type: 'longtext', nullable: true })
  note?: string;
}
