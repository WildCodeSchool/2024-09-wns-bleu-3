import { Scan } from '../entities/Scan'
import { User } from '../entities/User'
import { Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
export class Dashboard {
    @Field(() => User)
    user: User

    @Field(() => [Scan])
    scans: Scan[]

    @Field(() => Number)
    totalScans: number
}

@Resolver()
class DashboardResolver {
    @Query(() => Dashboard)
    async getUserDashboardData(
        @Ctx() context: any,
    ) {
        const userId = context.userId

        if (!userId) {
            throw new Error('User not authenticated or ID not provided.')
        }

        const user = await User.findOne({
            where: { id: userId },
            relations: ['scans'], // récupère les scans liés
        })

        if (!user) {
            throw new Error('Data not found for this user')
        }

        return {
            user,
            scans: user.scans,
            totalScans: user.scans.length,
        }
    }
}

export default DashboardResolver
