import { Query, Resolver } from 'type-graphql'
import { Scan } from '../entities/Scan'

@Resolver(Scan)
class ScanResolver {
    @Query(() => [Scan])
    async getAllScans() {
        const scans = await Scan.find({
            order: {
                id: 'DESC',
            },
        })
        return scans
    }
}

export default ScanResolver
