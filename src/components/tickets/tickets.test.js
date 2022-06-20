const request = require('supertest');
const app = require('../../app');

const services = {
    cashierOpenTicket: jest.fn('cashierOpenTicket')

}
// jest.mock('passport')
// passport.authenticate = jest.fn((req, res, next) => {
//     req.user.id = '123456';
//     next()
// })

describe('Tickets routes', () => {
    describe('Create new ticket', () => {
        it('Should return ok false when a cashier has an open ticket', async () => {
            // passport.authenticate.mockResolvedValue((req, res, next) => {
            //     req.user.id = '123456';
            //     next()
            // })
            services.cashierOpenTicket.mockResolvedValue(null)

            const response = await request(app).post('/ticket')
            expect(services.cashierOpenTicket.call.length).toBe(1)
            expect(response.ok).toBe(false)
        })

    })
})