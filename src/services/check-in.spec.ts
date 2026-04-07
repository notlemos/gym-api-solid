import { expect, describe, it, beforeEach, afterEach, vi} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/index-browser'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'



let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-In Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInService(checkInsRepository, gymsRepository)


        await gymsRepository.create({
            id: 'gym-01',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -20.5482998,
            longitude: -47.3855869,
        })
       
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.useRealTimers()
    })
    it('should be able to check in', async () => {
        const { checkIn } =  await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.5482998,
            userLongitude: -47.3855869,
        })
        console.log(checkIn.created_at)

        expect(checkIn.id).toEqual(expect.any(String))

    })
    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.5482998,
            userLongitude: -47.3855869,
        })


        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.5482998,
            userLongitude: -47.3855869,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)

    })
    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.5482998,
            userLongitude: -47.3855869,
        })


        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } =  await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -20.5482998,
            userLongitude: -47.3855869,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            longitude: new Decimal(-20.5006533),
            latitude: new Decimal(-47.3396127),
        })


        

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -20.5482998,
            userLongitude: -47.3855869,
        })).rejects.toBeInstanceOf(MaxDistanceError)

    })

})