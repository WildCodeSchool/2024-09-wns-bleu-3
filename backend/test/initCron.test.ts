import cron from 'node-cron';
import { initCronJobs } from '../src/cron/index';
import { runScheduledScans } from '../src/utils/scheduledScans';
import { MockInstance } from 'vitest';

vi.mock('node-cron', () => ({
    default: {
        schedule: vi.fn()
    }
}));

vi.mock('../src/utils/scheduledScans', () => ({
    runScheduledScans: vi.fn()
}));

describe('initCronJobs', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should initialize the cron job with the correct schedule and execute the callback', () => {
        (cron.schedule as unknown as MockInstance).mockImplementation((pattern: string, callback: () => void) => {
            expect(pattern).toBe('* * * * *');
            callback();
            return { stop: vi.fn() };
        });

        initCronJobs();

        expect(cron.schedule).toHaveBeenCalledTimes(1);
        expect(runScheduledScans).toHaveBeenCalledTimes(1);
    });
});