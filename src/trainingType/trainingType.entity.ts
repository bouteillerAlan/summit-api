import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { trainingTypeEnum } from './trainingType.enum';

@Entity()
export class TrainingType {
  @PrimaryGeneratedColumn()
  id: number;

  /* identity data */
  @Column({ type: 'enum', enum: trainingTypeEnum })
  name: trainingTypeEnum;

  @Column({ type: 'varchar', unique: false }) // todo unique false > awaiting the validator for the dto
  icon: string;

  @Column({ type: 'varchar' })
  code: string;
}
