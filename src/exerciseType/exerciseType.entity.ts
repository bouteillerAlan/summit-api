import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExerciseType {
  @PrimaryGeneratedColumn() id: number;

  /* identity data */
  @Column({ type: 'varchar', unique: true })
  name: string;
}
