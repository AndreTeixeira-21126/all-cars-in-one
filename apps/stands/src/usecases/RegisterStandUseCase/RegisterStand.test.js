const RegisterStandUseCase = require('./RegisterUser.usecase')
const InMemoryStandRepository = require('../../repositories/InMemoryStandRepository')
const Stand = require('../../entities/Stand')

const makeSut = () => {
  const standRepository = new InMemoryStandRepository()
  const sut = new RegisterStandUseCase(standRepository)
  return { sut, standRepository }
}
describe('RegisterStandUseCase', () => {
  it('should register a new stand', async () => {
    const { sut, standRepository } = makeSut()
    const result = await sut.execute({
      name: 'Stand X',
      location: 'Braga',
      phone: '123456789',
      mobilephone: '987654321'
    })

    expect(result.success).toBe(true)
    expect(result.data).toHaveProperty('id')
    expect(result.data).toHaveProperty('name', 'Stand X')
    expect(result.data).toHaveProperty('location', 'Braga')
    expect(result.data).toHaveProperty('phone', '123456789')
    expect(result.data).toHaveProperty('mobilephone', '987654321')
    const user = await standRepository.findByName('Stand X')
    expect(user).toHaveProperty('id', result.data.id)
    expect(user).toHaveProperty('name', result.data.name)
    expect(user).toHaveProperty('location', result.data.location)
    expect(user).toHaveProperty('phone', result.data.phone)
    expect(user).toHaveProperty('mobilephone', result.data.mobilephone)
  })
  it('should return a result.failed if stand already exists', async () => {
    const { sut, standRepository } = makeSut()
    standRepository.create(new Stand('Stand X', 'Braga', '123456789', '987654321', 'stand-id'))
    const result = await sut.execute({
      name: 'Stand X',
      location: 'Braga',
      phone: '123456789',
      mobilephone: '987654321'
    })
    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Stand name already used')
  })
  it('should return a result.failed if stand name validation fails', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({
      name: '',
      location: 'Braga',
      phone: '123456789',
      mobilephone: '987654321'
    })
    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Name is required')
  })
  it('should return a result.failed if location validation fails', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({
      name: 'Stand X',
      location: '',
      phone: '123456789',
      mobilephone: '987654321'
    })

    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Location is required')
  })
  it('should return a result.failed if phone validation fails', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({
      name: 'Stand X',
      location: 'Braga',
      phone: '',
      mobilephone: '987654321'
    })

    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Phone is required')
  })
  it('should return a result.failed if mobile phone validation fails', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({
      name: 'Stand X',
      location: 'Braga',
      phone: '123456789',
      mobilephone: ''
    })

    expect(result.success).toBe(false)
    expect(result.error.message).toBe('Mobile phone is required')
  })
})
