const makeApp = require('../src/appBuilder')
const InMemoryUserRepository = require('../src/repositories/InMemoryUserRepository')
const app = makeApp(new InMemoryUserRepository())
const request = require('supertest')(app)

describe('POST /users/register', () => {
  it('should return 201 if user is registered', async () => {
    const requestBody = { email: 'test@test.com', name: 'test', password: '12345678', confirmPassword: '12345678', role: 'user' }
    const response = await request.post('/users/register').send(requestBody)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name', requestBody.name)
    expect(response.body).toHaveProperty('email', requestBody.email)
    expect(response.body).toHaveProperty('role', requestBody.role)
    expect(response.body).not.toHaveProperty('password')
  })
  it('should return 400 if some parameter is missing', async () => {
    const requestBody = { name: 'test', password: '12345678', confirmPassword: '12345678', role: 'user' }
    const response = await request.post('/users/register').send(requestBody)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Missing fields')
  })
  it('should return 400 if password has less than 8 characters', async () => {
    const requestBody = { email: 'test@test.com', name: 'test', password: '123456', confirmPassword: '123456', role: 'user' }
    const response = await request.post('/users/register').send(requestBody)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Password must be at least 8 characters')
  })
  it('should return 400 if password and confirmPassword are different', async () => {
    const requestBody = { email: 'test@test.com', name: 'test', password: '12345678', confirmPassword: '1234567', role: 'user' }
    const response = await request.post('/users/register').send(requestBody)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Passwords don t match')
  })

  it('should return 400 if email is invalid', async () => {
    const requestBody = { email: 'test', name: 'test', password: '12345678', confirmPassword: '12345678', role: 'user' }
    const response = await request.post('/users/register').send(requestBody)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Invalid email')
  })
})
