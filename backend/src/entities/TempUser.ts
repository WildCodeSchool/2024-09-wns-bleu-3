import { MinLength } from 'class-validator'
import { Field } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TempUser extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @MinLength(4)
    @Column({ type: 'varchar', nullable: false })
    username: string

    @Field(() => String)
    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    hashedPassword: string

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    randomCode: string

    @Field(() => Date)
    @Column({ type: 'timestamp', nullable: false })
    expiresAt: Date
}
