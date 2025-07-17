import { In, IsNull, Not } from 'typeorm'
import { dataHealthCheck } from '../src/config/db'
import { Frequency } from '../src/entities/Frequency'
import { Role } from '../src/entities/Role'
import { Scan } from '../src/entities/Scan'
import { Tag } from '../src/entities/Tag'
import { User } from '../src/entities/User'
import { faker } from '@faker-js/faker'
import * as argon2 from 'argon2'

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
    isFavorite: boolean
    user: User
}

async function mockScanUrl(frequency: Frequency, user: User, allTags: Tag[]): Promise<ScanData> {
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
        tagIds: selectedTags.map(tag => tag.id),
        frequency,
        lastScannedAt: new Date(),
        nextScanAt: new Date(Date.now() + 15 * 60 * 1000),
        isPause: false,
        isFavorite: false,
        user,
    }
}

async function createFakeScans(count: number, frequency: Frequency, user: User, tags: Tag[]): Promise<Scan[]> {
    const scanRepo = dataHealthCheck.getRepository(Scan)
    const tagRepo = dataHealthCheck.getRepository(Tag)
    const scans: Scan[] = []

    for (let i = 0; i < count; i++) {
        const scanData = await mockScanUrl(frequency, user, tags)
        const scan = scanRepo.create({ ...scanData, frequency, user })
        scan.tags = await tagRepo.findBy({ id: In(scanData.tagIds) })
        scans.push(scan)
    }

    return scans
}

export async function seedDatabase() {
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
        // const hashedPassword2 = await argon2.hash(process.env.LOGIN_TEST_PWD2 as string)

        const roles = rolesRepo.create([{ name: 'User' }, { name: 'Admin' }])
        await rolesRepo.save(roles)

        const users = userRepo.create([
            {
                email: 'f.rumigny@gmail.com',
                password: hashedPassword,
                username: 'florian',
                role: roles.find(r => r.name === 'Admin'),
            },

        ])
        await userRepo.save(users)

        const tags = tagRepo.create([
            { name: 'Vitrine', color: '#FF0000' },
            { name: 'Web App', color: '#00FF00' },
            { name: 'Mobile App', color: '#0000FF' },
            { name: 'API', color: '#FFFF00' },
            { name: 'Base de données', color: '#00FFFF' },
            { name: 'Serveur', color: '#FF00FF' },
            { name: 'Autre', color: '#FFFFFE' },
        ])
        await tagRepo.save(tags)

        const frequencies = frequencyRepo.create([
            { name: 'Every 1 minutes', intervalMinutes: 1 },
            { name: 'Every 15 minutes', intervalMinutes: 15 },
            { name: 'Every 30 minutes', intervalMinutes: 30 },
            { name: 'Every hour', intervalMinutes: 60 },
        ])
        await frequencyRepo.save(frequencies)

        const user = await userRepo.findOneByOrFail({ email: 'f.rumigny@gmail.com' })

        const scans = await createFakeScans(10, frequencies[0], user, tags)
        await scanRepo.save(scans)
    }
    catch (error) {
        console.error('Error initializing dataHealthCheck: ', error)
    }
}
