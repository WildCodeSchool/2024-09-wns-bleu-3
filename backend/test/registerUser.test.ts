import { afterEach, describe, expect, it, vi } from 'vitest'

import UserResolver from 'src/resolver/UserResolver'
import { TempUser } from 'src/entities/TempUser'
import { User } from 'src/entities/User'
import { Role } from 'src/entities/Role'

const resolver = new UserResolver()

describe('userResolver - register', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('registers a user when the verification code is still valid', async () => {
        const freshTempUser = {
            id: 1,
            username: 'newUser',
            email: 'newuser@example.com',
            hashedPassword: 'hashed-password',
            randomCode: 'uuid-code',
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // futur
            remove: vi.fn().mockResolvedValue(undefined),
        } as unknown as TempUser

        const role = { id: 5, name: 'User' } as Role

        vi.spyOn(TempUser, 'findOneBy').mockResolvedValue(freshTempUser)
        vi.spyOn(User, 'findOneBy').mockResolvedValue(null)
        vi.spyOn(Role, 'findOneBy').mockResolvedValue(role)
        const saveSpy = vi.spyOn(User, 'save').mockResolvedValue({ id: 42 } as any)

        const result = await resolver.register(freshTempUser.randomCode)

        expect(result).toBe('User successfully created')
        expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({
            username: freshTempUser.username,
            email: freshTempUser.email,
            password: freshTempUser.hashedPassword,
            role,
        }))
        expect(freshTempUser.remove).toHaveBeenCalled()
    })

    it('throws when the verification code has expired', async () => {
        const expiredTempUser = {
            id: 2,
            username: 'expired-user',
            email: 'expired@example.com',
            hashedPassword: 'hashed-password',
            randomCode: 'expired-code',
            expiresAt: new Date(Date.now() - 60 * 60 * 1000), // passé
            remove: vi.fn().mockResolvedValue(undefined),
        } as unknown as TempUser

        vi.spyOn(TempUser, 'findOneBy').mockResolvedValue(expiredTempUser)
        vi.spyOn(User, 'findOneBy').mockResolvedValue(null)
        vi.spyOn(Role, 'findOneBy').mockResolvedValue({ id: 5, name: 'User' } as Role)
        vi.spyOn(User, 'save').mockResolvedValue({ id: 42 } as any)

        await expect(resolver.register(expiredTempUser.randomCode))
            .rejects
            .toThrow('Code expired')

        expect(expiredTempUser.remove).toHaveBeenCalled()
    })

    it('throws when no TempUser is found for the code', async () => {
        vi.spyOn(TempUser, 'findOneBy').mockResolvedValue(null) // aucun tempUser
        vi.spyOn(User, 'findOneBy').mockResolvedValue(null)
        vi.spyOn(Role, 'findOneBy').mockResolvedValue({ id: 5, name: 'User' } as Role)
        vi.spyOn(User, 'save').mockResolvedValue({ id: 42 } as any)

        await expect(resolver.register('non-existing-code'))
            .rejects
            .toThrow('User Not found')
    })

    it('throws when user with same email already exists', async () => {
        const tempUser = {
            id: 3,
            username: 'dup-user',
            email: 'dup@example.com',
            hashedPassword: 'hashed-password',
            randomCode: 'dup-code',
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            remove: vi.fn().mockResolvedValue(undefined),
        } as unknown as TempUser

        vi.spyOn(TempUser, 'findOneBy').mockResolvedValue(tempUser)
        vi.spyOn(User, 'findOneBy').mockResolvedValue({ id: 99 } as User) // simulate déjà en base

        await expect(resolver.register(tempUser.randomCode))
            .rejects
            .toThrow('User already exists.')

        expect(tempUser.remove).toHaveBeenCalled()
    })

    it('throws when default role is not found', async () => {
        const tempUser = {
            id: 4,
            username: 'roleless',
            email: 'roleless@example.com',
            hashedPassword: 'hashed-password',
            randomCode: 'roleless-code',
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            remove: vi.fn().mockResolvedValue(undefined),
        } as unknown as TempUser

        vi.spyOn(TempUser, 'findOneBy').mockResolvedValue(tempUser)
        vi.spyOn(User, 'findOneBy').mockResolvedValue(null)
        vi.spyOn(Role, 'findOneBy').mockResolvedValue(null) // pas de rôle trouvé

        await expect(resolver.register(tempUser.randomCode))
            .rejects
            .toThrow('Default role not found')
    })
})
