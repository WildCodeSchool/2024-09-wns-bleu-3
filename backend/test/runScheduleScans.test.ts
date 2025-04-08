import { runScheduledScans } from '../src/utils/scheduledScans';
import { LessThan } from 'typeorm';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Scan } from '../src/entities/Scan';

vi.mock('../src/entities/Scan', () => ({
    Scan: {
        find: vi.fn().mockResolvedValue([])
    }
}));

vi.mock('../src/entities/Frequency', () => ({
}));

vi.mock('../src/entities/Tag', () => ({
}));

vi.mock('../src/entities/User', () => ({
}));

describe('runScheduledScans', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('devrait appeler Scan.find avec le bon critère de filtrage', async () => {
        const now = new Date('2023-01-01T12:00:00Z');
        vi.spyOn(global, 'Date').mockImplementation(() => now as any);

        await runScheduledScans();

        expect(Scan.find).toHaveBeenCalledWith({
            relations: ['frequency'],
            where: {
                nextScanAt: LessThan(now)
            }
        });
    });
});