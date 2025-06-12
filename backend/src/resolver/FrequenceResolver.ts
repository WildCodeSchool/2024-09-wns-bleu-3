import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Scan } from '../entities/Scan'
import { Frequency } from '../entities/Frequency'
import { FrequencyInput } from '../inputs/FrequencyInput'
import { UpdateFrequencyInput } from '../inputs/UpdateFrequencyInput'

@Resolver(Scan)
class FrequenceResolver {
    // @Authorized("Admin", "User") // à décommenté lorsque sera retiré de la homepage scan history 
    @Query(() => [Frequency])
    async getAllFrequences() {
        const frequency = await Frequency.find({
            order: {
                id: 'DESC',
            },
        })
        if (frequency.length === 0)
            throw new Error('Aucune fréquence trouvée')
        return frequency
    }

    // @Authorized("Admin", "User")
    @Query(() => Frequency)
    async getFrequenceById(@Arg('id') id: number) {
        const frequency = await Frequency.findOne({
            where: { id },
        })
        if (!frequency)
            throw new Error('La fréquence n\'existe pas')
        return frequency
    }

    @Authorized("Admin", "User")
    @Mutation(() => String)
    async deleteFrequence(@Arg('id') id: number) {
        const frequenceToDelete = await Frequency.findOne({
            where: { id },
        })
        if (!frequenceToDelete)
            throw new Error('La fréquence n\'existe pas')
        await Frequency.remove(frequenceToDelete)
        return 'La fréquence a bien été supprimée'
    }

    // create new frequence
    @Authorized("Admin", "User")
    @Mutation(() => Frequency)
    async createNewFrequence(@Arg('data') newFrequenceData: FrequencyInput) {
        try {
            const newFrequency = Frequency.create({ ...newFrequenceData })
            await newFrequency.save()
            return newFrequency
        }
        catch (error) {
            console.error('Erreur lors de la création de la fréquence  :', error)
            throw new Error('Erreur lors de la création de la fréquence')
        }
    }

    // updateFrequence
    @Authorized("Admin")
    @Mutation(() => String)
    async updateFrequence(@Arg('id') id: number, @Arg('data') updateFrequenceData: UpdateFrequencyInput) {
        const frequencyToUpdate = await Frequency.findOne({
            where: { id },
        })
        if (!frequencyToUpdate)
            throw new Error('Fréquence non trouvée')
        Object.assign(frequencyToUpdate, updateFrequenceData)

        await Frequency.save(frequencyToUpdate)

        return `La fréquence ${id} a bien été mise à jour`
    }
}

export default FrequenceResolver
