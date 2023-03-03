import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../auth/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /* identity data */
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.user })
  role: RoleEnum;
}
