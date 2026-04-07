import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym } from "generated/prisma/client"
import { GymsRepotitory } from "@/repositories/gyms-repository"


interface CreateGymServiceRequest {
    title: string,
    description: string | null,
    phone: string,
    latitude: number, 
    longitude: number
}
interface CreateGymServiceResponse {
    gym: Gym
}


export class CreateGymService {
    constructor(private gymsRepository: GymsRepotitory){}
    
    async execute({title, description, phone, latitude, longitude}: CreateGymServiceRequest): Promise <CreateGymServiceResponse> {

    const gym = await this.gymsRepository.create({
        title, 
        description, 
        phone, 
        latitude, 
        longitude
    })

    return {
        gym,
    }
  }   
}




