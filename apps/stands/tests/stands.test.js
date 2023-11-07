const makeApp = require('../src/appBuilder')
const User = require('../src/entities/Stand')
const InMemoryStandRepository = require('../src/repositories/InMemoryStandRepository')
const standRepository = new InMemoryStandRepository()
const app = makeApp(standRepository)
const request = require('supertest')(app)
describe('POST /stands/register', () => {
  it('should return 201 if stand is registered', async () => {
    const requestBody = { name: 'Stand X', location: 'Braga', phone: '123456789', mobilephone: '987654321' }
    const response = await request.post('/stands/register').send(requestBody)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name', requestBody.name)
    expect(response.body).toHaveProperty('location', requestBody.location)
    expect(response.body).toHaveProperty('phone', requestBody.phone)
    expect(response.body).toHaveProperty('mobilephone', requestBody.mobilephone)
  })
  it('should return 400 if some parameter is missing', async () => {
    const requestBody = { name: 'Stand X', phone: '123456789', mobilephone: '987654321' }
    const response = await request.post('/stands/register').send(requestBody)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Missing fields')
  })
})
