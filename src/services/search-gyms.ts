import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym } from "generated/prisma/client"
import { GymsRepotitory } from "@/repositories/gyms-repository"


interface SearchGymsServiceRequest {
   query: string
   page: number
}
interface SearchGymsServiceResponse {
    gyms: Gym[]
}


export class SearchGymsService {
    constructor(private gymsRepository: GymsRepotitory){}
    
    async execute({query, page}: SearchGymsServiceRequest): Promise <SearchGymsServiceResponse> {

    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
        gyms,
    }
  }   
}