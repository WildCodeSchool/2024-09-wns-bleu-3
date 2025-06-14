import { In, IsNull, Not } from 'typeorm'
import { dataHealthCheck } from '../src/config/db'
import { Frequency } from '../src/entities/Frequency'
import { Role } from '../src/entities/Role'
import { Scan } from '../src/entities/Scan'
import { Tag } from '../src/entities/Tag'
import { User } from '../src/entities/User'
import { faker } from '@faker-js/faker'
import * as argon2 from 'argon2'

// Scan type for creation
interface ScanData {
    title: string
    url: string
    statusCode: 200 | 404 | 500
    statusMessage: 'OK' | 'Not Found' | 'Internal Server Error'
    responseTime: number
    sslCertificate: '15 days' | '500 days' | 'Expired'
    isOnline: boolean
    tagIds: number[]
    frequency: Frequency
    lastScannedAt: Date | null
    nextScanAt: Date | null
    isPause: boolean
    user: User
}

// Create a mock scan object
async function mockScanUrl(frequency: Frequency, user: User, allTags: Tag[]): Promise<ScanData> {
    // Mocking a scan URL
    const urls = [
        'http://vitest.dev/',
        'https://fr.react.dev/',
        'https://www.youtube.com/',
        'https://openai.com/',
        'https://vite.dev/',
    ]
    const selectedTags = faker.helpers.arrayElements(allTags, faker.number.int({ min: 1, max: 2 }))

    return {
        title: faker.lorem.words(3),
        url: faker.helpers.arrayElement(urls),
        statusCode: faker.helpers.arrayElement([200, 404, 500]),
        statusMessage: faker.helpers.arrayElement(['OK', 'Not Found', 'Internal Server Error']),
        responseTime: faker.number.int({ min: 10, max: 100 }),
        sslCertificate: faker.helpers.arrayElement(['15 days', '500 days', 'Expired']),
        isOnline: faker.datatype.boolean(),
        tagIds: selectedTags.map(tag => tag.id), // Optional tags
        frequency, // Optional frequency
        lastScannedAt: null,
        nextScanAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        isPause: false,
        user, // Assuming user ID 1 exists
    }
}

// Create a certain number of fake scans
async function createFakeScans(count: number, frequency: Frequency, user: User, tag: Tag[]): Promise<ScanData[]> {
    const fakeScans: ScanData[] = []

    for (let i = 0; i < count; i++) {
        const scanData = await mockScanUrl(frequency, user, tag)
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
        const rolesRepo = dataHealthCheck.getRepository(Role)

        await scanRepo.delete({ id: Not(IsNull()) })
        await tagRepo.delete({ id: Not(IsNull()) })
        await frequencyRepo.delete({ id: Not(IsNull()) })
        await userRepo.delete({ id: Not(IsNull()) })
        await rolesRepo.delete({ id: Not(IsNull()) })
        console.log('Deleted all data')

        const hashedPassword = await argon2.hash(process.env.LOGIN_TEST_PWD as string)

        // Create fake roles
        const roles = rolesRepo.create([
            { name: 'User' },
            { name: 'Admin' },
        ])
        await rolesRepo.save(roles)

        // Create some fake users
        const users = userRepo.create([
            {
                email: 'f.rumigny@gmail.com',
                password: hashedPassword,
                username: 'florian',
                role: roles.find(r => r.name === 'Admin'),
            },
            {
                email: 'bylo@duck.com',
                password: '$argon2id$v=19$m=65536,t=3,p=4$FwWGT2p/5nv2rd/68srNCQ$W4W8Fl7f2cSdvbwnwprACl8cwa1ykbz/ORiBkMAk3KU',
                username: 'amadou',
                role: roles.find(r => r.name === 'User'),
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
            color: '#FFFFFE',
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

        const user = await userRepo.findOneByOrFail({ email: 'f.rumigny@gmail.com' })
        if (!user) {
            throw new Error('User not found')
        }
        // const fakeScans = await createFakeScans(10, frequencies[2], user, tags)
        // const scans = scanRepo.create(fakeScans)
        // await scanRepo.save(scans)

        // Create fake scans
        const fakeScans = await createFakeScans(10, frequencies[2], user, tags)

        const scansWithTags: Scan[] = []

        for (const scanData of fakeScans) {
            const scan = scanRepo.create({
                ...scanData,
                frequency: scanData.frequency,
                user: scanData.user,
            })

            // Associer les tags à partir des IDs
            scan.tags = await tagRepo.findBy({ id: In(scanData.tagIds) })

            console.log(`Scan ==> ${scan.title} → Tags ==> ${scan.tags.map(t => t.name).join(', ')}`)

            scansWithTags.push(scan)
        }

        await scanRepo.save(scansWithTags)
    }
    catch (error) {
        console.error('Error initializing dataHealthCheck: ', error)
    }
}
