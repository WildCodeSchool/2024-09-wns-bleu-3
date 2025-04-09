import cron from 'node-cron'
import { runScheduledScans } from '../utils/scheduledScans'

/**
 * Initialise CRON
 */
export function initCronJobs() {
    // Exécuter toutes les minutes pour vérifier les scans
    cron.schedule('* * * * *', async () => {
        console.log('Running scheduled scan check at', new Date().toISOString())
        await runScheduledScans()
    })

    console.log('CRON initialized')
}
