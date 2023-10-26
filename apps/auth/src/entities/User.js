class User {
  /**
     * @description Constructor of user entity
     * @param {*} name name of user
     * @param {*} email email of user
     * @param {*} password password of user
     * @param {*} id id of user, can be a integer, an uuid or a string
     */
  constructor (name, email, password, id = undefined) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  /**
   * @description Create a new instance of User making the necessary validations
   * @param {*} name Name of user
   * @param {*} email Email of User
   * @param {*} password Password of User
   * @param {*} id Id of User
   * @returns a new instance of User
   */

  static create (name, email, password, id = undefined) {
    if (name.length === 0) {
      throw new Error('Name is required')
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      throw new Error('Invalid email')
    }
    return new User(name, email, password, id)
  }
}

module.exports = User
