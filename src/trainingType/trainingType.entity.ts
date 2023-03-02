import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrainingType {
  @PrimaryGeneratedColumn()
  id: number;

  /* identity data */
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ type: 'varchar', unique: true })
  code: string;
}
