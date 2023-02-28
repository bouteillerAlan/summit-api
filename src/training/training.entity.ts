import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Training {
  @PrimaryGeneratedColumn() id: number;

  /* link */
  @Column({ type: 'varchar' }) owner: string; /* todo id */
  @Column({ type: 'varchar' }) type: string; /* todo id */

  /* identity data */
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'datetime' }) date: Date;

  /* planned data */
  @Column({ type: 'float' }) plannedDistance: number;
  @Column({ type: 'int' }) plannedDuration: number;
  @Column({ type: 'float' }) plannedPace: number;
  @Column({ type: 'int' }) plannedCalorie: number;

  /* current data */
  @Column({ type: 'float' }) distance: number;
  @Column({ type: 'int' }) duration: number;
  @Column({ type: 'float' }) pace: number;
  @Column({ type: 'int' }) calorie: number;

  /* additional data */
  @Column({ type: 'varchar' }) note: string;
  @Column({ type: 'varchar' }) postActivityNote: string;
  @Column({ type: 'int' }) perceivedExertion: number;
  @Column({ type: 'int' }) feeling: number;
}
