const mysql2 = require('mysql2/promise')
const User = require('../entities/User')

/**
 * @description MySQL user repository
 * @see https://martinfowler.com/bliki/InMemoryTestDatabase.html
 */

class MySqlUserRepository {
  constructor (uri) {
    this.uri = uri
  }

  /**
     * @description Creates an user on the repository
     * @param {*} user User object
     * @returns the added object
     */
  async create (user) {
    const connection = mysql2.createPool(this.uri)
    let [rows] = await connection.query('SELECT * FROM usertype WHERE id = ?', [user.roleId])
    if (rows.length < 1) {
      throw new Error('Invalid role')
    }
    const role = rows[0]
    const sql = 'INSERT INTO user (name, email, password, usertype_id) VALUES (?, ?, ?, ?)'
    await connection.query(sql, [user.name, user.email, user.password, user.roleId])

    let [result] = await connection.query('SELECT * FROM user WHERE email = ?', [user.email])
    if (result.length < 1) {
      throw new Error('User not created')
    }
    const userCreated = result[0]
    const newUser = User.create(userCreated.name, userCreated.email, userCreated.password, role, userCreated.id)
    return newUser
  }

  /**
     * @description Find an user by email on the repository
     * @param {*} email user email
     * @returns user or undefined
     */
  async findByEmail (email) {
    const connection = mysql2.createPool(this.uri)
    const [rows] = await connection.query('SELECT * FROM user WHERE email = ?', [email])
    if (rows.length < 1) {
      return undefined
    }
    const user = rows[0]
      [rows] = await connection.query('SELECT * FROM usertype WHERE id = ?', [user.usertype_id])
    if (rows.length < 1) {
      throw new Error('Invalid role')
    }
    return User.create(user.name, user.email, user.password, rows[0].name, rows[0].id)
  }
}

module.exports = MySqlUserRepository
