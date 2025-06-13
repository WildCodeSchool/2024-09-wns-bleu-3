import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Role } from "../entities/Role";
import { RoleInput } from "../inputs/RoleInputs";

@Resolver(Role)
class RoleResolver {
    // @Authorized("Admin")
    @Query(() => [Role])
    async getAllRoles() {
        try {
            const roles = await Role.find({
                relations: ['users'],
                order: {
                    id: "DESC",
                }
            })
            return roles
        }
        catch (error) {
            console.error({ 'Erreur lors de la récupération des roles': error })
            throw new Error('Erreur lors de la récupération des roles')
        }
    }

    // @Authorized("Admin")
    @Mutation(() => Role)
    async createNewRole(@Arg('data') newRoleData: RoleInput) {
        try {
            const existingRole = await Role.findOne({
                where: { name: newRoleData.name },
            })
            if (existingRole) {
                throw new Error("Un role avec ce nom existe déjà")
            }
            const newRole = Role.create({ ...newRoleData })
            await newRole.save()
            return newRole
        }
        catch (error) {
            console.error({ 'Erreur lors de la création du rôle': error })
            throw new Error('Erreur lors de la création du rôle')
        }
    }

    // @Authorized("Admin")
    @Mutation(() => String)
    async deleteRole(@Arg('name') name: string) {
        const roleToDelete = await Role.findOne({
            where: { name },
        })
        if (!roleToDelete)
            throw new Error('Le Role n\'existe pas')
        await Role.remove(roleToDelete)
        return 'Le Role a bien été supprimé'
    }
}

export default RoleResolver