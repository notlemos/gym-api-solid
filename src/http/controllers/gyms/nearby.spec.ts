import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Near',
                description: 'Some Description',
                phone: '1699999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Far',
                description: 'Some Description',
                phone: '1699999999',
                latitude: -27.0610928,
                longitude: -49.5229581,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        console.log(response.statusCode)

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Near'
            }),
        ])


    })
})