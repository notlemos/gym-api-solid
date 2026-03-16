import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register"

export function makeRegisterService() {
    const UsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(UsersRepository)

    return registerService
}