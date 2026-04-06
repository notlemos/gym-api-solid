import { Gym } from "generated/prisma/client";

export interface GymsRepotitory {
    findById(id: string): Promise<Gym | null>
}