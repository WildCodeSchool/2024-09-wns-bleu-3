import { ScanHistory } from "../entities/ScanHistory";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(ScanHistory)
class ScanHistoryResolver {
    @Query(() => [ScanHistory])
    async getScanHistory(@Arg('scanId') scanId: number, @Arg('limit', { nullable: true }) limit: number = 6) {
        try {
            const history = await ScanHistory.find({
                where: { scan: { id: scanId } },
                order: { createdAt: 'DESC' },
                take: limit
            });

            return history;
        } catch (error) {
            console.error({ 'Error getting scan history': error });
            throw new Error('Something wrong happened');
        }
    }
}

export default ScanHistoryResolver