import { runScheduledScans } from '../src/utils/scheduledScans';
import { LessThan } from 'typeorm';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Scan } from '../src/entities/Scan';
import { scanUrl } from '../src/utils/scanUrl';

vi.mock('../src/entities/Scan', () => ({
    Scan: {
        find: vi.fn().mockResolvedValue([]),
    },
}));

const mockScanHistorySave = vi.fn().mockResolvedValue(true);
const mockScanHistoryInstance = {
    save: mockScanHistorySave,
    scan: null,
    statusCode: 0,
    statusMessage: '',
    responseTime: 0,
    sslCertificate: '',
    isOnline: false,
    isPause: false
};

vi.mock('../src/entities/ScanHistory', () => {
    return {
        ScanHistory: function () {
            return { ...mockScanHistoryInstance };
        }
    };
});

vi.mock('../src/utils/scanUrl', () => ({
    scanUrl: vi.fn(),
}));

describe('runScheduledScans', () => {
    const fixedDate = new Date('2023-01-01T12:00:00Z');
    const mockSave = vi.fn().mockResolvedValue(true);

    // Un scan dont nextScanAt est dans le passé
    const pastScan = {
        id: 1,
        url: 'https://example.com',
        nextScanAt: new Date('2022-12-31T12:00:00Z'),
        frequency: { intervalMinutes: 60 },
        save: mockSave,
        statusCode: 0,
        statusMessage: '',
        responseTime: 0,
        sslCertificate: '',
        isOnline: false,
        lastScannedAt: null,
        isPause: false,
    };

    beforeEach(() => {
        // Réinitialisation de tous les mocks avant chaque test
        vi.resetAllMocks();
        // Pour que tous les appels à new Date() retournent la date fixe
        vi.useFakeTimers();
        vi.setSystemTime(fixedDate);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('devrait appeler Scan.find avec le bon filtrage', async () => {
        await runScheduledScans();
        expect(Scan.find).toHaveBeenCalledWith({
            relations: ['frequency'],
            where: {
                nextScanAt: LessThan(fixedDate),
                isPause: false,
            },
        });
    });

    it('devrait mettre à jour et sauvegarder le scan', async () => {
        // Prépa du scan
        (Scan.find as any).mockResolvedValueOnce([pastScan]);

        // Config du mock pour simuler une réponse valide de scanUrl
        (scanUrl as any).mockResolvedValueOnce({
            statusCode: 200,
            statusMessage: 'OK',
            responseTime: 150,
            sslCertificate: 'certificat-valide',
            isOnline: true,
        });

        await runScheduledScans();

        // ScanUrl a été appelée avec le bon URL
        expect(scanUrl).toHaveBeenCalledTimes(1);
        expect(scanUrl).toHaveBeenCalledWith(pastScan.url);

        // Vérif que save a été appelée pour persister la mise à jour
        expect(mockSave).toHaveBeenCalledTimes(1);

        // Vérif que certains champs du scan ont été mis à jour
        expect(pastScan.statusCode).toBe(200);
        expect(pastScan.statusMessage).toBe('OK');
        expect(pastScan.responseTime).toBe(150);
        expect(pastScan.sslCertificate).toBe('certificat-valide');
        expect(pastScan.isOnline).toBe(true);
        expect(pastScan.lastScannedAt).toBeInstanceOf(Date);

        // Vérif que nextScanAt à été recalculé
        const expectedNextScan = new Date(fixedDate.getTime());
        expectedNextScan.setMinutes(expectedNextScan.getMinutes() + pastScan.frequency.intervalMinutes);
        // Comparaison entre nextScanAt modifié et la date à laquelle on souhaite qu'il soit modifié
        expect(pastScan.nextScanAt.getTime()).toBe(expectedNextScan.getTime());
    });

    it('devrait bien géré les erreurs Scan.find', async () => {
        // Simuler une erreur lors de l'appel à Scan.find
        (Scan.find as any).mockRejectedValueOnce(new Error('DB error'));

        await expect(runScheduledScans()).resolves.not.toThrow();

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        await runScheduledScans();
        expect(consoleErrorSpy).toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });
});
