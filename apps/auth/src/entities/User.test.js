const User = require('./User')

describe('User entity', () => {
  it('should create a new user', () => {
    const user = User.create('John Doe', 'test@test.com', '123456', 'user-id')

    expect(user).toHaveProperty('id', 'user-id')
    expect(user).toHaveProperty('name', 'John Doe')
    expect(user).toHaveProperty('email', 'test@test.com')
    expect(user).toHaveProperty('password', '123456')
  })
})
