import { ScanHistory } from '../entities/ScanHistory';
import { Scan } from '../entities/Scan';
import { scanUrl } from './scanUrl';
import { LessThan } from 'typeorm';
import { limitScanHistory } from './scheduleDeleteHistoryScans';

/**
 * Exécute tous les scans avec fréquences programmé
 */
export async function runScheduledScans() {
    try {
        const now = new Date();

        // Récupérer tous les scans actifs avec leurs fréquences
        const scans = await Scan.find({
            relations: ['frequency'],
            where: {
                // scan + intervalle < maintenant
                nextScanAt: LessThan(now),
                isPause: false
            }
        });

        console.log(`Found ${scans.length} scans to run`);

        // Pour chaque scan à exec, mettre à jour les résultats
        for (const scan of scans) {
            await updateScanResults(scan);
        }

        console.log('Scheduled scans completed successfully');
    } catch (error) {
        console.error('Error running scheduled scans:', error);
    }
}

/**
 * Met à jour les résultats d'un scan spécifique
 * @param scan Le scan à mettre à jour
 */
async function updateScanResults(scan: Scan) {
    try {
        const urlData = await scanUrl(scan.url);

        if ('error' in urlData) {
            console.error(`Error scanning ${scan.url}: ${urlData.error}`);
            scan.isOnline = false;
            scan.statusMessage = `Error: ${urlData.error}`;
        } else {
            // Update the scan record with latest data
            const { statusCode, statusMessage, responseTime, sslCertificate, isOnline } = urlData;

            scan.statusCode = statusCode;
            scan.statusMessage = statusMessage;
            scan.responseTime = responseTime;
            scan.sslCertificate = sslCertificate || "";
            scan.isOnline = isOnline;

            // Create a history record
            const historyRecord = new ScanHistory();
            historyRecord.scan = scan;
            historyRecord.url = scan.url;
            historyRecord.statusCode = statusCode;
            historyRecord.statusMessage = statusMessage;
            historyRecord.responseTime = responseTime;
            historyRecord.sslCertificate = sslCertificate || "";
            historyRecord.isOnline = isOnline;
            await historyRecord.save();
        }

        // Update the scan's last scanned date
        scan.lastScannedAt = new Date();

        // Calculate next scan date
        if (scan.frequency) {
            const nextScanDate = new Date();
            nextScanDate.setMinutes(nextScanDate.getMinutes() + scan.frequency.intervalMinutes);
            scan.nextScanAt = nextScanDate;
        }

        await scan.save();
        await limitScanHistory(scan.id);
        console.log(`Scan updated for ${scan.url}`);
    } catch (error) {
        console.error(`Failed to update scan ${scan.id}:`, error);
    }
}