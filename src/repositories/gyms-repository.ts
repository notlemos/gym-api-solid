import { Gym, Prisma } from "generated/prisma/client";

export interface GymsRepotitory {
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}