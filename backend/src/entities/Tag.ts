import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Scan } from './Scan'

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string

    @Field(() => String)
    @Column({ type: 'varchar', length: 7, nullable: false })
    color: string

    // Relation Many-to-Many avec Scan
    @Field(() => [Scan])
    @ManyToMany(() => Scan, scan => scan.tags)
    scans: Scan[]
}
