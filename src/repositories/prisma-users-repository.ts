import { prisma } from "@/lib/prisma"
import * as Models from "generated/prisma/models"

export class PrismaUsersRepository {
    async create(data: Models.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}
