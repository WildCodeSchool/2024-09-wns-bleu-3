import { Arg, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql'
import { Scan } from '../entities/Scan'
import { ScanInput } from '../inputs/ScanInput'
import { UpdateScanInput } from '../inputs/UpdateScanInput'
import { Tag } from '../entities/Tag'
import { scanUrl } from '../utils/scanUrl'
import { Frequency } from '../entities/Frequency'
import { pubSub } from '../utils/pubSub'
import { ScanByUserId } from '../inputs/ScanById'
import { User } from '../entities/User'
import { ContextType } from '../schema/context'
import { issuesArray } from '../utils/issuesArray'

@Resolver(Scan)
class ScanResolver {
    @Query(() => [Scan])
    async getAllScans() {
        try {
            const scans = await Scan.find({
                order: {
                    id: 'DESC',
                },
            })
            return scans
        }
        catch (error) {
            console.error({ 'Error getting all scans': error })
            throw new Error('Something wrong happened')
        }
    }

    @Query(() => ScanByUserId)
    async getAllScansByUserId(@Ctx() context: ContextType) {
        const userId = context.id

        if (!userId) {
            throw new Error('You are not authorized to view this user\'s scans')
        }
        try {
            const user = await User.findOneByOrFail({ id: userId })

            const scans = await Scan.find({
                where: { user: { id: userId } },
                order: {
                    id: 'DESC',
                },
            })

            const issues = issuesArray(scans)

            return {
                scans,
                issues,
                totalIssues: issues.length,
                totalScans: scans.length,
                username: user?.username ?? null,
            }
        }
        catch (error) {
            console.error({ 'Error getting all scans by user ID': error })
            throw new Error('Something wrong happened')
        }
    }

    @Subscription({
        topics: 'SCAN_CREATED',
    })
    newScan(@Root() scan: Scan): Scan {
        console.log('New scan created:', scan)
        return scan
    }

    @Mutation(() => Scan)
    async createNewScan(@Arg('data') newScanData: ScanInput) {
        try {
            const urlData = await scanUrl(newScanData.url)

            if ('error' in urlData) {
                throw new Error(urlData.error)
            }

            const { url, statusCode, statusMessage, responseTime, sslCertificate, isOnline } = urlData

            // Create the scan object
            const newScanToSave = Scan.create({
                title: newScanData.title,
                url,
                statusCode,
                statusMessage,
                responseTime,
                sslCertificate,
                isOnline,
            })

            // Handle tags if provided
            if (newScanData.tagIds && newScanData.tagIds.length > 0) {
                const tags = await Tag.findByIds(newScanData.tagIds)
                newScanToSave.tags = tags
            }

            if (newScanData.frequencyId) {
                const frequency = await Frequency.findOne({ where: { id: newScanData.frequencyId } })
                if (frequency) {
                    newScanToSave.frequency = frequency
                    // Initialize the next scan date
                    const nextScanDate = new Date()
                    nextScanDate.setMinutes(nextScanDate.getMinutes() + frequency.intervalMinutes)
                    newScanToSave.nextScanAt = nextScanDate
                }
            }

            const result = await newScanToSave.save()

            // Publish the new scan to subscribers
            pubSub.publish('SCAN_CREATED', result)

            return result
        }

        catch (error) {
            console.error({ 'Error creating scan': error })
            throw new Error('Something wrong happened')
        }
    }

    @Mutation(() => String)
    async deleteScan(@Arg('id') id: number) {
        try {
            const result = await Scan.delete(id)

            if (result.affected === 1) {
                return 'Scan has been deleted'
            }
            else {
                throw new Error('Scan has not been found')
            }
        }
        catch (error) {
            console.error({ 'Error deleting scan': error })
            throw new Error('Something wrong happened')
        }
    }

    @Query(() => Scan)
    async getScanById(@Arg('id') id: number) {
        const scan = await Scan.findOne({
            where: { id },
            order: { id: 'DESC' },
        })
        if (scan === null) {
            throw new Error(`Cannot find scan with id ${id}`)
        }
        return scan
    }

    @Mutation(() => Scan)
    async pauseOrRestartScan(@Arg('id') id: number) {
        const scan = await Scan.findOne({
            where: { id },
        })

        if (!scan) {
            return null
        }
        scan.isPause = scan?.isPause === true ? false : true

        await scan.save()

        return scan
    }

    @Mutation(() => String)
    async updateScan(@Arg('data') updateScanData: UpdateScanInput) {
        try {
            let scanToUpdate = await Scan.findOne({
                where: { id: updateScanData.id },
                relations: ['tags'],
            })

            if (!scanToUpdate) {
                throw new Error(`Cannot find scan with id ${updateScanData.id}`)
            }

            scanToUpdate = Object.assign(scanToUpdate, {
                title: updateScanData.title,
            })

            if (updateScanData.tagIds && updateScanData.tagIds.length >= 0) {
                const tags = await Tag.findByIds(updateScanData.tagIds)

                scanToUpdate.tags = tags
            }

            await scanToUpdate.save()

            if (updateScanData.frequencyId !== undefined) {
                const frequency = await Frequency.findOne({ where: { id: updateScanData.frequencyId } })
                if (frequency) {
                    scanToUpdate.frequency = frequency

                    // Mettre à jour la date du prochain scan
                    const nextScanDate = new Date()
                    nextScanDate.setMinutes(nextScanDate.getMinutes() + frequency.intervalMinutes)
                    scanToUpdate.nextScanAt = nextScanDate
                }
                else {
                    scanToUpdate.frequency = null
                    scanToUpdate.nextScanAt = null
                }
            }

            return 'Scan has been updated'
        }
        catch (error) {
            console.error('Error updating scan:', error)
            throw new Error('Failed to update scan')
        }
    }
}

export default ScanResolver
