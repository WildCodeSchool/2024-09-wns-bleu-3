import { dataHealthCheck } from '../src/config/db'
import { Frequency } from '../src/entities/Frequency'
import { Scan } from '../src/entities/Scan'
import { Tag } from '../src/entities/Tag'
import { User } from '../src/entities/User'
import { faker } from '@faker-js/faker'

// Ton type pour un scan
interface ScanData {
    title: string
    url: string
    statusCode: 200 | 404 | 500
    statusMessage: 'OK' | 'Not Found' | 'Internal Server Error'
    responseTime: number
    sslCertificate: '15 days' | '500 days' | 'Expired'
    isOnline: boolean
    tagIds: string[] // Tu peux mettre un type plus précis si nécessaire
    frequencyId: null | number // null si pas de fréquence
    lastScannedAt: Date | null
    nextScanAt: Date | null
}

// Create a mock scan object
async function mockScanUrl(frequency: Frequency): Promise<ScanData> {
    // Mocking a scan URL
    const urls = [
        'http://vitest.dev/',
        'https://fr.react.dev/',
        'https://www.youtube.com/',
        'https://openai.com/',
        'https://vite.dev/',
    ]

    return {
        title: faker.lorem.words(3),
        url: faker.helpers.arrayElement(urls),
        statusCode: faker.helpers.arrayElement([200, 404, 500]),
        statusMessage: faker.helpers.arrayElement(['OK', 'Not Found', 'Internal Server Error']),
        responseTime: faker.number.int({ min: 10, max: 100 }),
        sslCertificate: faker.helpers.arrayElement(['15 days', '500 days', 'Expired']),
        isOnline: faker.datatype.boolean(),
        tagIds: [], // Optional tags
        frequencyId: frequency.id, // Optional frequency
        lastScannedAt: null,
        nextScanAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    }
}

// Create a certain number of fake scans
async function createFakeScans(count: number, frequency: Frequency): Promise<ScanData[]> {
    const fakeScans: ScanData[] = []

    for (let i = 0; i < count; i++) {
        const scanData = await mockScanUrl(frequency)
        fakeScans.push(scanData)
    }

    return fakeScans
}

export async function seedDatabase() {
    // Seed the database with some data

    try {
        const userRepo = dataHealthCheck.getRepository(User)
        const scanRepo = dataHealthCheck.getRepository(Scan)
        const tagRepo = dataHealthCheck.getRepository(Tag)
        const frequencyRepo = dataHealthCheck.getRepository(Frequency)

        await userRepo.delete({})
        await scanRepo.delete({})
        await tagRepo.delete({})
        await frequencyRepo.delete({})
        console.log('Deleted all data')

        // Create some fake users
        const users = userRepo.create([
            {
                email: 'f.rumigny@gmail.com',
                password: 'password',
                username: 'frumigny',
            },
            {
                email: 'umu@test.com',
                password: 'password',
                username: 'umu',
            },
        ])
        await userRepo.save(users)

        // Create fake tags
        const tags = tagRepo.create([{
            name: 'Vitrine',
            color: '#FF0000',
        }, {
            name: 'Web App',
            color: '#00FF00',
        }, {
            name: 'Mobile App',
            color: '#0000FF',
        }, {
            name: 'API',
            color: '#FFFF00',
        }, {
            name: 'Base de données',
            color: '#00FFFF',
        }, {
            name: 'Serveur',
            color: '#FF00FF',
        }, {
            name: 'Autre',
            color: '#FFFFFF',
        }])
        await tagRepo.save(tags)

        // Create fake frequencies
        const frequencies = frequencyRepo.create([{
            name: 'Every 1 minutes',
            intervalMinutes: 1,
        }, {
            name: 'Every 15 minutes',
            intervalMinutes: 15,
        }, {
            name: 'Every 30 minutes',
            intervalMinutes: 30,
        }, {
            name: 'Every hour',
            intervalMinutes: 60,
        }])
        await frequencyRepo.save(frequencies)

        const fakeScans = await createFakeScans(10, frequencies[0])
        const scans = scanRepo.create(fakeScans)
        await scanRepo.save(scans)

        // Create fake scans
    }
    catch (error) {
        console.error('Error initializing dataHealthCheck: ', error)
    }
}
