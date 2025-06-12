import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Scan } from './Scan'
import { IsInt, Length } from 'class-validator'

@ObjectType()
@Entity()
export class Frequency extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Length(1, 30, { message: 'Name must be between 1 and 30 characters' })
    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string

    @Field(() => Number)
    @IsInt({ message: 'Interval must be an integer number' })
    @Column({ type: 'int', nullable: false })
    intervalMinutes: number

    // Relation One-to-Many avec Scan
    @Field(() => [Scan])
    @OneToMany(() => Scan, scan => scan.frequency)
    scans: Scan[]
}
