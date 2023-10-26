class InMemoryUserRepository {
  constructor () {
    this.users = []
  }

  async create (user) {
    this.users.push(user)
    return user
  }

  async findByEmail (email) {
    return this.users.find((user) => user.email === email)
  }
}

module.exports = InMemoryUserRepository
