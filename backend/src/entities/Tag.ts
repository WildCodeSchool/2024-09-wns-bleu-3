import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Scan } from './Scan'

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true, nullable: false })
    name: string

    @Field()
    @Column({ type: 'varchar', length: 7, nullable: false })
    color: string

    // Relation Many-to-Many avec Scan
    @Field(() => [Scan])
    @ManyToMany(() => Scan, scan => scan.tags)
    scans: Scan[]
}
