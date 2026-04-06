import { Gym } from "generated/prisma/client";
import { GymsRepotitory } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepotitory {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

}