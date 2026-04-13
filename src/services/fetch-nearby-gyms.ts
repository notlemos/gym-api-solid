import { Gym } from "generated/prisma/client"
import { GymsRepotitory } from "@/repositories/gyms-repository"


interface FetchNearByGymsServiceRequest {
   userLatitude: number 
   userLongitude: number
}
interface FetchNearByGymsServiceResponse {
    gyms: Gym[]
}


export class FetchNearByGymsService {
    constructor(private gymsRepository: GymsRepotitory){}
    
    async execute({userLatitude, userLongitude}: FetchNearByGymsServiceRequest): Promise <FetchNearByGymsServiceResponse> {

    const gyms = await this.gymsRepository.findManyNearby({
        latitude: userLatitude,
        longitude: userLongitude,
    })

    return {
        gyms,
    }
  }   
}