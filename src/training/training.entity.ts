import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TrainingType } from '../trainingType/trainingType.entity';
import { feelingEnum, perceivedExertionEnum } from './training.enum';

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  /* link */
  @Column({ type: 'int' })
  owner: number;

  @ManyToOne(type => TrainingType, trainingType => trainingType.id)
  trainingType: number;

  /* identity data */
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime' })
  date: Date;

  /* planned data */
  @Column({ type: 'float' })
  plannedDistance: number;

  @Column({ type: 'int' })
  plannedDuration: number;

  @Column({ type: 'float' })
  plannedPace: number;

  @Column({ type: 'int' })
  plannedCalorie: number;

  /* current data */
  @Column({ type: 'float' })
  distance: number;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'float' })
  pace: number;

  @Column({ type: 'int' })
  calorie: number;

  /* additional data */
  @Column({ type: 'longtext' })
  note: string;

  @Column({ type: 'longtext' })
  postActivityNote: string;

  @Column({ type: 'enum', enum: perceivedExertionEnum })
  perceivedExertion: perceivedExertionEnum;

  @Column({ type: 'enum', enum: feelingEnum })
  feeling: feelingEnum;
}
