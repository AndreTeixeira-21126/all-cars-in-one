class User {
  /**
     * @description Constructor of user entity
     * @param {*} name name of user
     * @param {*} email email of user
     * @param {*} password password of user
     * @param {*} id id of user, can be a integer, an uuid or a string
     */
  constructor (name, email, password, id) {
    this.id = id
    this.name = name
  }
}

module.exports = User
