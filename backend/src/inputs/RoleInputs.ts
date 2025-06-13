import { Role } from '../entities/Role'
import { Field, InputType } from 'type-graphql'

@InputType()
export class RoleInput implements Partial<Role> {

    @Field()
    name: string

}
