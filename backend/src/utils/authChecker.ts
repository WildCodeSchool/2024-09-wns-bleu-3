import { AuthChecker } from 'type-graphql'
import { Context } from '../schema/context'

export const authChecker: AuthChecker<Context> = ({ context }, roles) => {
    if (!context.role) return false
    if (roles.length === 0) return true

    return roles.includes(context.role)
}