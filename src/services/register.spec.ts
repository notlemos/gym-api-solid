import { expect, describe, it} from 'vitest'
import { RegisterService } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerRegister = new RegisterService(prismaUsersRepository)

        await registerRegister.execute({
            name: 'John Doe',
            email: 'johndoe@sample.com',
            password: '123456'
        })
    })
})