import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-users-check-ins-history-service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)


    const fetchUserCheckInsHistory = makeFetchUserCheckInsHistoryService()
    const { checkIns } = await fetchUserCheckInsHistory.execute({
        userId: request.user.sub,
        page
    })

    return reply.status(200).send({
        checkIns,
    })
}