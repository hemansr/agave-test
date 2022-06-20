const request = require('supertest');
const app = require('../app');

describe('Auth routes', ()=>{
    test('should return status 400 when no username or password is sent', async()=>{
        const body = {
            username: null,
            password: 123456
        }
        const response = await request(app).post('/login').send(body)
        expect(response.statusCode).toBe(400)
    })
})