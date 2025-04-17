import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ForgotPassword extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({ unique: true })
    randomCode: string

    @Column('timestamp')
    expiresAt: Date
}
