import { Gym, Prisma } from "generated/prisma/client";

export interface GymsRepotitory {
    findById(id: string): Promise<Gym | null>
    searchMany(query: string, page: number): Promise <Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}