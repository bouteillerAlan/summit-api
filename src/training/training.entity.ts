import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;
}
