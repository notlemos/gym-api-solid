import { FetchNearByGymsService } from "../fetch-nearby-gyms"
import { SearchGymsService } from "../search-gyms"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsService() {
    const gymsRepository = new PrismaGymsRepository()
    const service = new FetchNearByGymsService(gymsRepository)

    return service
}