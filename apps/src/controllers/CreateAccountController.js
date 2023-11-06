
/**
 * @class CreateAccountController
 * @description Controller to register a new user
 */

class CreateAccountController {
  constructor (databaseInstance) {
    this.databaseInstance = databaseInstance
  }

  /**
   * @description Method to execute http request for register user
   * @param {*} request request object from express
   * @param {*} response response object from express
   * @returns response object from express
   */
  async execute (request, response) {
    return response.status(201).json(user.data)
  }
}

module.exports = CreateAccountController