class User {
  /**
     * @description Constructor of stand entity
     * @param {*} name stand name
     * @param {*} location stand location
     * @param {*} phone stand phone
     * @param {*} mobilephone stand mobile phone
     * @param {*} schedule stand schedule
     * @param {*} id id of stand, can be a integer, an uuid or a string
     */
  constructor (name, location, phone, mobilephone, schedule, id = undefined) {
    this.id = id
    this.name = name
    this.location = location
    this.phone = phone
    this.mobilephone = mobilephone
    this.schedule = schedule
  }

  toJson () {
    return { name: this.name, location: this.location, phone: this.phone, mobilephone: this.mobilephone, id: this.id }
  }

  /**
   * @description Create a new instance of Stand making the necessary validations
   * @param {*} name Stand name
   * @param {*} location stand location
   * @param {*} phone stand phone
   * @param {*} mobilephone stand mobile phone
   * @param {*} schedule stand schedule
   * @param {*} id Id of Stand
   * @returns a new instance of Stand
   */
  static create (name, location, phone, mobilephone, schedule, id = undefined) {
    if (name.length === 0) {
      throw new Error('Name is required')
    }
    if (location.length === 0) {
      throw new Error('Location is required')
    }
    if (phone.length != 9) {
      throw new Error('Phone number is required')
    }
    return new Stand(name, location, phone, mobilephone, schedule, id)
  }
}

module.exports = User
