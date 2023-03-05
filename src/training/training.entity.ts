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
  @Column({ type: 'float', nullable: true })
  plannedDistance?: number;

  @Column({ type: 'int', nullable: true })
  plannedDuration?: number;

  @Column({ type: 'float', nullable: true })
  plannedPace?: number;

  @Column({ type: 'int', nullable: true })
  plannedCalorie?: number;

  /* current data */
  @Column({ type: 'float', nullable: true })
  distance?: number;

  @Column({ type: 'int', nullable: true })
  duration?: number;

  @Column({ type: 'float', nullable: true })
  pace?: number;

  @Column({ type: 'int', nullable: true })
  calorie?: number;

  /* additional data */
  @Column({ type: 'longtext', nullable: true })
  note?: string;

  @Column({ type: 'longtext', nullable: true })
  postActivityNote?: string;

  @Column({ type: 'enum', enum: perceivedExertionEnum, nullable: true })
  perceivedExertion?: perceivedExertionEnum;

  @Column({ type: 'enum', enum: feelingEnum })
  feeling?: feelingEnum;
}
