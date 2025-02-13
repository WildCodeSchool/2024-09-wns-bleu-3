import { Arg, Query, Resolver } from 'type-graphql'
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

    @Query(() => Scan)
    async getScanById(@Arg("id") id: number) {
        const scan = await Scan.findOne({
            where: { id: id },
            order: { id: "DESC" },
        })
        if (scan === null) {
            throw new Error("Cannot find scan with id " + id);
        }
        return scan
    }
}

export default ScanResolver
