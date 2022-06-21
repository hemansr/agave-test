var httpMocks = require('node-mocks-http');

const { createTicket } = require('./tickets.controller');
const sequelize = require('../../config/database');

let req, res, next
beforeEach(() => {
    req = httpMocks.createRequest()
    req.user = { id: '123456' }
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('Tickets routes', () => {
    describe('Create new ticket', () => {
        it('Should return ok:false when a cashier has an open ticket', async () => {
            sequelize.tickets.findOne = jest.fn(() => { return { id: 654321 } })
            await createTicket(req, res, next);
            const response = res._getJSONData()
            expect(response.ok).toBe(false)
        })
        it('Should return an open ticket object', async () => {
            sequelize.tickets.findOne = jest.fn(() => null)
            sequelize.tickets.create = jest.fn(() => { return { id: 654321, status: 'open' } })
            await createTicket(req, res, next);
            const response = res._getJSONData()
            expect(res.statusCode).toBe(201)
            expect(response.ok).toBe(true)
            expect(typeof response.ticket).toBe('object')
            expect(response.ticket.status).toBe('open')
        })

    })
})