/**
 * @description This is a in-memory repository, it can be a mysql, postgres, mongodb, etc
 * @see https://martinfowler.com/bliki/InMemoryTestDatabase.html
 */

const User = require('../entities/User')

class InMemoryUserRepository {
  static id = 1
  constructor () {
    this.users = []
  }

  /**
   * @description Creates an user on the repository
   * @param {*} user User object
   * @returns the added object
   */
  async create (user) {
    const roles = { 1: 'admin', 2: 'customer', 3: 'manager' }
    const id = InMemoryUserRepository.id++
    const role = roles[user.roleId]
    const newUser = User.create(user.name, user.email, user.password, role, id)
    this.users.push(newUser)
    return newUser
  }

  /**
   * @description Find an user by email on the repository
   * @param {*} email user email
   * @returns user or undefined
   */
  async findByEmail (email) {
    return this.users.find((user) => user.email === email)
  }
}

module.exports = InMemoryUserRepository
