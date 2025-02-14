import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Scan } from '../entities/Scan'
import { ScanInput } from '../inputs/ScanInput'
import { UpdateScanInput } from '../inputs/UpdateScanInput'

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

    @Mutation(() => Scan)
    async createNewScan(@Arg('data') newScanData: ScanInput) {
        try {
            const newScanToSave = Scan.create({
                ...newScanData,
            })

            const result = await newScanToSave.save()

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

    @Mutation(() => String)
    async updateScan(@Arg('data') updateScanData: UpdateScanInput) {
        let ScanToUpdate = await Scan.findOneByOrFail({ id: updateScanData.id })
        console.log('scan to update', ScanToUpdate)
        ScanToUpdate = Object.assign(ScanToUpdate, updateScanData)
        console.log('scan to update', ScanToUpdate)
        const result = await ScanToUpdate.save()
        console.log(result)
        return 'Scan has been updated'
    }
}

export default ScanResolver
