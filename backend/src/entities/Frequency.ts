import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Scan } from './Scan'

@ObjectType()
@Entity()
export class Frequency extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true, nullable: false })
    name: string

    @Field()
    @Column({ type: 'int', nullable: false })
    intervalMinutes: number

    // Relation One-to-Many avec Scan
    @Field(() => [Scan])
    @OneToMany(() => Scan, scan => scan.frequency)
    scans: Scan[]
}
