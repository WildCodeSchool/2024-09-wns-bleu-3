import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TempUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column()
  randomCode: string;
}
//1 Auth : loger
// 2 Logiout
// 3 modififcation PMDP / reset