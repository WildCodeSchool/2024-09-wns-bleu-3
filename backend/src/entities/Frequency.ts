import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Scan } from './Scan'

@ObjectType()
@Entity()
export class Frequency extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string

    @Field(() => Number)
    @Column({ type: 'int', nullable: false })
    intervalMinutes: number

    // Relation One-to-Many avec Scan
    @Field(() => [Scan])
    @OneToMany(() => Scan, scan => scan.frequency)
    scans: Scan[]
}
