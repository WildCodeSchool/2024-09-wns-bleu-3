import { ContextType } from '../schema/context'
import { ScanHistory } from '../entities/ScanHistory'
import { Arg, Ctx, Query, Resolver, Root, Subscription } from 'type-graphql'

@Resolver(ScanHistory)
class ScanHistoryResolver {
    // @Authorized("Admin", "User") // à décommenté lorsque sera retiré de la homepage scan history 
    @Query(() => [ScanHistory])
    async getScanHistory(@Arg('scanId') scanId: number, @Arg('limit', { nullable: true }) limit: number = 6) {
        try {
            const history = await ScanHistory.find({
                where: { scan: { id: scanId } },
                order: { createdAt: 'DESC' },
                take: limit,
            })

            return history
        }
        catch (error) {
            console.error({ 'Error getting scan history': error })
            throw new Error('Something wrong happened')
        }
    }

    @Subscription(() => ScanHistory, {
        topics: 'SCAN_HISTORY_ADDED',
    })
    scanHistoryAdded(@Root() scanHistoryAdd: ScanHistory): ScanHistory {
        console.log('🔔 Subscription resolver called with:', {
            id: scanHistoryAdd.id,
            scanId: scanHistoryAdd.scan?.id,
            timestamp: new Date().toISOString()
        });
        return scanHistoryAdd;
    }

    @Query(() => [ScanHistory])
    async getAllScanHistory(@Ctx() context: ContextType) {
        try {
            const histories = await ScanHistory.find({
                where: {
                    scan: {
                        user: {
                            id: context.id
                        }
                    }
                },
                relations: ['scan', 'scan.user'],
                order: { createdAt: 'DESC' },
            })

            return histories
        }
        catch (error) {
            console.error({ 'Error getting scan history': error })
            throw new Error('Something wrong happened')
        }
    }
}

export default ScanHistoryResolver
