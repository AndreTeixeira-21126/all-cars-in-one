const Stand = require('./Stand')

describe('Stand entity', () => {
  it('should create a new stand', () => {
    const stand = Stand.create('Stand X', 'Braga', '123456789', '987654321', 'stand-id')

    expect(stand).toHaveProperty('id', 'stand-id')
    expect(stand).toHaveProperty('name', 'Stand X')
    expect(stand).toHaveProperty('location', 'Braga')
    expect(stand).toHaveProperty('phone', '123456789')
    expect(stand).toHaveProperty('mobilephone', '987654321')
  })
  it('should throw an error when name is empty', () => {
    expect(() => Stand.create('', 'Braga', '123456789', '987654321', 'stand-id')).toThrow(Error)
  })
  it('should throw an error when location is empty', () => {
    expect(() => Stand.create('Stand X', '', '123456789', '987654321', 'stand-id')).toThrow(Error)
  })
})
