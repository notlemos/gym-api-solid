import { prisma } from "@/lib/prisma"

import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterServiceRequest {
    name: string
    email: string
    password: string
}

// SOLID

// D - Dependency Inversion Principle

export class RegisterService {
    constructor(private usersRepository: any){}
    
    async execute({
    name, email, password
}: RegisterServiceRequest) {
    const password_hash = await hassh(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (userWithSameEmail) {
        throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
        name,
        email,
        password_hash
    })

}
}




