import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn() id: number;

  /* link */
  @Column({ type: 'varchar' }) type: string; /* todo id */
  @Column({ type: 'varchar' }) training: string; /* todo id */

  /* current data */
  @Column({ type: 'int' }) weight: number;
  @Column({ type: 'int' }) repetition: number;
  @Column({ type: 'int' }) series: number;

  /* additional data */
  @Column({ type: 'varchar' }) note: string;
}
