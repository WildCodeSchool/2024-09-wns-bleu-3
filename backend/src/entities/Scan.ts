import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Scan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    title: string

    @Column()
    statusCode: number

    @Column()
    statusMessage: string

    @Column()
    responseTime: number

    @Column()
    sslCertificate: boolean

    @Column()
    isOnline: boolean

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}
