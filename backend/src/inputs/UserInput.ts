import { User } from "../entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    username: string

    @Field()
    email: string;

    @Field()
    password: string;
}