import { Arg, Ctx, Int, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql'
import { Scan } from '../entities/Scan'
import { ScanInput } from '../inputs/ScanInput'
import { UpdateScanInput } from '../inputs/UpdateScanInput'
import { ScanPreview } from '../inputs/ScanPreview'
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
    // Public query to preview scan results without authentication or persistence
    @Query(() => ScanPreview)
    async previewScan(@Arg('url', () => String) url: string): Promise<ScanPreview> {
        try {
            const result = await scanUrl(url)

            // Check if scanUrl returned an error
            if ('error' in result) {
                throw new Error(result.error)
            }

            // Ensure sslCertificate is always a string (handle optional case)
            return {
                ...result,
                sslCertificate: result.sslCertificate || 'Error retrieving SSL expiry',
            }
        }
        catch (error) {
            console.error({ 'Error in previewScan': error })
            // Re-throw the original error instead of a generic message
            throw error
        }
    }

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

    @Subscription(() => Scan, {
        topics: 'SCAN_CREATED',
    })
    newScan(@Root() scan: Scan): Scan {
        console.log('New scan created:', scan)
        return scan
    }

    @Mutation(() => Scan)
    async createNewScan(@Arg('data', () => ScanInput) newScanData: ScanInput, @Ctx() context: ContextType) {
        // Check if user is authenticated
        const userId = context.id
        if (!userId) {
            throw new Error('You must be logged in to create a scan')
        }

        try {
            // Get the authenticated user
            const user = await User.findOneByOrFail({ id: userId })

            const urlData = await scanUrl(newScanData.url)

            if ('error' in urlData) {
                throw new Error(urlData.error)
            }

            const { url, statusCode, statusMessage, responseTime, sslCertificate, isOnline } = urlData

            // Create the scan object and associate it with the authenticated user
            const newScanToSave = Scan.create({
                title: newScanData.title,
                url,
                statusCode,
                statusMessage,
                responseTime,
                sslCertificate,
                isOnline,
                user, // Associate scan with the authenticated user
            })

            // Handle tags if provided
            if (newScanData.tagIds && newScanData.tagIds.length > 0) {
                const tags = await Tag.findByIds(newScanData.tagIds)
                newScanToSave.tags = tags
            }

            // Handle frequency - if not provided, use default (60 minutes)
            let frequency: Frequency
            if (newScanData.frequencyId) {
                const foundFrequency = await Frequency.findOne({ where: { id: newScanData.frequencyId } })
                if (!foundFrequency) {
                    throw new Error('Invalid frequency selected')
                }
                frequency = foundFrequency
            }
            else {
                // Default to 60 minutes frequency if not specified
                const defaultFrequency = await Frequency.findOne({ where: { intervalMinutes: 60 } })
                if (!defaultFrequency) {
                    throw new Error('Default frequency (60 minutes) not found in database')
                }
                frequency = defaultFrequency
            }

            newScanToSave.frequency = frequency
            // Initialize the next scan date
            const nextScanDate = new Date()
            nextScanDate.setMinutes(nextScanDate.getMinutes() + frequency.intervalMinutes)
            newScanToSave.nextScanAt = nextScanDate

            const result = await newScanToSave.save()

            // Publish the new scan to subscribers
            pubSub.publish('SCAN_CREATED', result)

            return result
        }
        catch (error) {
            console.error({ 'Error creating scan': error })
            // Re-throw the original error instead of a generic message
            throw error
        }
    }

    @Mutation(() => String)
    async deleteScan(@Arg('id', () => Int) id: number) {
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
    async getScanById(@Arg('id', () => Int) id: number) {
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
    async pauseOrRestartScan(@Arg('id', () => Int) id: number) {
        const scan = await Scan.findOne({
            where: { id },
        })

        if (!scan) {
            return null
        }
        scan.isPause = scan?.isPause !== true

        await scan.save()

        return scan
    }

    @Mutation(() => String)
    async updateScan(@Arg('data', () => UpdateScanInput) updateScanData: UpdateScanInput) {
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
                let frequency: Frequency
                if (updateScanData.frequencyId) {
                    const foundFrequency = await Frequency.findOne({ where: { id: updateScanData.frequencyId } })
                    if (!foundFrequency) {
                        throw new Error('Invalid frequency selected for update')
                    }
                    frequency = foundFrequency
                }
                else {
                    // Default to 60 minutes frequency if not specified
                    const defaultFrequency = await Frequency.findOne({ where: { intervalMinutes: 60 } })
                    if (!defaultFrequency) {
                        throw new Error('Default frequency (60 minutes) not found in database')
                    }
                    frequency = defaultFrequency
                }

                scanToUpdate.frequency = frequency
                // Update next scan date
                const nextScanDate = new Date()
                nextScanDate.setMinutes(nextScanDate.getMinutes() + frequency.intervalMinutes)
                scanToUpdate.nextScanAt = nextScanDate
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
