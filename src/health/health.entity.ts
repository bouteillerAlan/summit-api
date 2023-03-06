import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { HealthType } from '../health/health.entity';
import { User } from '../user/user.entity';

@Entity()
export class Health {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.id)
  owner: number;

  /* current data */
  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'datetime' })
  date: Date;

}
