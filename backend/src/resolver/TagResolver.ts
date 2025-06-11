import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Tag } from '../entities/Tag'
import { TagInput } from '../inputs/TagInput'
import { UpdateTagInput } from '../inputs/UpdateTagInput'

@Resolver(Tag)
class TagResolver {
    @Query(() => [Tag])
    async getAllTags() {
        const tags = await Tag.find({
            order: {
                id: 'DESC',
            },
        })
        if (tags.length === 0)
            throw new Error('Aucun tag trouvé')
        return tags
    }

    @Query(() => Tag)
    async getTagById(@Arg('id') id: number) {
        const tag = await Tag.findOne({
            where: { id },
        })
        if (!tag)
            throw new Error('Le tag n\'existe pas')
        return tag
    }

    @Authorized("Admin", "User")
    @Mutation(() => String)
    async deleteTag(@Arg('id') id: number) {
        const tagToDelete = await Tag.findOne({
            where: { id },
        })
        if (!tagToDelete)
            throw new Error('Le tag n\'existe pas')
        await Tag.remove(tagToDelete)
        return 'Le tag a bien été supprimé'
    }

    @Authorized("Admin", "User")
    @Mutation(() => Tag)
    async createNewTag(@Arg('data') newTagData: TagInput) {
        try {
            // Check if a tag with the same name already exists
            const existingTag = await Tag.findOne({
                where: { name: newTagData.name },
            })
            if (existingTag) {
                throw new Error('Un tag avec ce nom existe déjà')
            }

            const newTag = Tag.create({ ...newTagData })
            await newTag.save()
            return newTag
        }
        catch (error) {
            console.error('Erreur lors de la création du tag :', error)
            throw new Error('Erreur lors de la création du tag')
        }
    }

    @Authorized("Admin", "User")
    @Mutation(() => String)
    async updateTag(@Arg('id') id: number, @Arg('data') updateTagData: UpdateTagInput) {
        const tagToUpdate = await Tag.findOne({
            where: { id },
        })
        if (!tagToUpdate)
            throw new Error('Tag non trouvé')

        // If updating name, check if new name already exists
        if (updateTagData.name) {
            const existingTag = await Tag.findOne({
                where: { name: updateTagData.name },
            })
            if (existingTag && existingTag.id !== id) {
                throw new Error('Un tag avec ce nom existe déjà')
            }
        }

        Object.assign(tagToUpdate, updateTagData)
        await Tag.save(tagToUpdate)

        return `Le tag ${id} a bien été mis à jour`
    }
}

export default TagResolver
