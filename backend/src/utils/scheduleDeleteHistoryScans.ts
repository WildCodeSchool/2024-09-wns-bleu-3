import { ScanHistory } from "../entities/ScanHistory";

export async function limitScanHistory(scanId: number, maxRecords: number = 6) {

    try {
        const countScanHistory = await ScanHistory.count({
            where: { scan: { id: scanId } }
        })
        console.log(countScanHistory)
        let totalScanHistoryToDelete = 0;

        if (countScanHistory > maxRecords) {
            totalScanHistoryToDelete = countScanHistory - maxRecords
            console.log('total of ScanHistory to delete', totalScanHistoryToDelete)
            const oldestScanHistories = await ScanHistory.find({
                where: {
                    scan: { id: scanId }
                },
                order: {
                    createdAt: 'ASC',
                },
                take: totalScanHistoryToDelete
            })
            console.log(`Found ${oldestScanHistories.length} oldest records to delete`)

            await ScanHistory.remove(oldestScanHistories)

            console.log(`Successfully deleted ${oldestScanHistories.length} oldest scan history records`);
            console.log(`Limited scan history for scan ${scanId} to ${maxRecords} records`);
        }
    } catch (error) {
        console.error(`Error limiting scan history: ${error}`);
    }
}