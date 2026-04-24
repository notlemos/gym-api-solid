import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body)


    const fetchNearbyGYms = makeFetchNearbyGymsService()
    const { gyms } = await fetchNearbyGYms.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(200).send({
        gyms,
    })
}