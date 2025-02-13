import { Query, Resolver } from 'type-graphql'
import { Scan } from '../entities/Scan'

@Resolver(Scan)
class ScanResolver {
    @Query(() => String)
    async getAllScans() {
        return 'ok'
    }
}

export default ScanResolver
