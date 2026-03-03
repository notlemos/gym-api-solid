import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "generated/prisma/client"
import { UsersRepository } from "@/repositories/users-repository"

interface RegisterServiceRequest {
    name: string
    email: string
    password: string
}
interface RegisterServiceResponde {
    user: User
}
// SOLID

// D - Dependency Inversion Principle

export class RegisterService {
    constructor(private usersRepository: UsersRepository){}
    
    async execute({name, email, password}: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
        throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
        name,
        email,
        password_hash
    })

    return {
        user,
    }
  }   
}




