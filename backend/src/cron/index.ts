import cron from 'node-cron'
import { runScheduledScans } from '../utils/scheduledScans'
import { cleanupExpiredCodes } from 'scripts/cleanup-expired'

/**
 * Initializes all CRON jobs
 */
export function initCronJobs() {
    // Run every minute to check for scheduled scans
    cron.schedule('* * * * *', async () => {
        console.log('Running scheduled scan check at', new Date().toISOString())
        await runScheduledScans()
    })

    // Clean up expired password reset codes every day at 3:00 AM
  cron.schedule('0 3 * * *', async () => {
    console.log('🧹 Running cleanup of expired password-reset requests at', new Date().toISOString())
    await cleanupExpiredCodes()
  })

    console.log('CRON initialized')
}
