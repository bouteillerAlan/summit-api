import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExerciseType {
  @PrimaryGeneratedColumn()
  id: number;

  /* identity data */
  @Column({ type: 'varchar', unique: false }) // todo unique false > awaiting the validator for the dto
  name: string;

  @Column({ type: 'varchar' })
  code: string;
}
