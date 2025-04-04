import { Scan } from '../entities/Scan';
import { scanUrl } from './scanUrl';
import { LessThan } from 'typeorm';

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
                nextScanAt: LessThan(now)
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
            // Mettre à jour les données du scan
            const { statusCode, statusMessage, responseTime, sslCertificate, isOnline } = urlData;

            scan.statusCode = statusCode;
            scan.statusMessage = statusMessage;
            scan.responseTime = responseTime;
            scan.sslCertificate = sslCertificate || "";
            scan.isOnline = isOnline;
        }

        // Mise à jour de la date du dernier scan
        scan.lastScannedAt = new Date();

        // Calcul de la prochaine date de scan en fonction de la fréquence
        if (scan.frequency) {
            const nextScanDate = new Date();
            nextScanDate.setMinutes(nextScanDate.getMinutes() + scan.frequency.intervalMinutes);
            scan.nextScanAt = nextScanDate;
        }

        await scan.save();
        console.log(`Scan updated for ${scan.url}`);
    } catch (error) {
        console.error(`Failed to update scan ${scan.id}:`, error);
    }
}