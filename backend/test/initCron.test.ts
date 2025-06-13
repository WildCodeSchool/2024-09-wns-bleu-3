import cron from 'node-cron';
import { initCronJobs } from '../src/cron/index';
import { runScheduledScans } from '../src/utils/scheduledScans';
import { cleanupExpiredCodes } from '../src/utils/cleanup-expired';
import { beforeEach, describe, expect, it, MockInstance, vi } from 'vitest';

vi.mock('node-cron', () => ({
    default: {
        schedule: vi.fn()
    }
}));

vi.mock('../src/utils/scheduledScans', () => ({
    runScheduledScans: vi.fn()
}));

vi.mock('../src/utils/cleanup-expired', () => ({
    cleanupExpiredCodes: vi.fn()
}))

describe('initCronJobs', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });
    it('Initialise deux jobs cron avec les bons patterns', () => {
        const mockSchedule = cron.schedule as unknown as MockInstance;

        mockSchedule.mockImplementation((pattern: string, callback: () => void) => {
            // Appelle le callback pour vérifier qu’il ne jette pas d’erreur
            callback();
            return { stop: vi.fn() };
        });

        initCronJobs();

        expect(cron.schedule).toHaveBeenCalledTimes(2);

        const firstCallPattern = mockSchedule.mock.calls[0][0];
        const secondCallPattern = mockSchedule.mock.calls[1][0];

        expect([firstCallPattern, secondCallPattern]).toContain('* * * * *');
        expect([firstCallPattern, secondCallPattern]).toContain('0 3 * * *');

        expect(runScheduledScans).toHaveBeenCalledTimes(1);
        expect(cleanupExpiredCodes).toHaveBeenCalledTimes(1);
    });
});