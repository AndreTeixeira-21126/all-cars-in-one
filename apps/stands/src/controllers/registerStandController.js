const RegisterStandUseCase = require('../usecases/RegisterStandUseCase/RegisterStand.usecase')
const bcrypt = require('bcrypt') // ? - tem de estar aqui ? TIP: perguntar ao professor de arquitetura

// Acoplado com o express. O req e o res têm de estar aqui ou não vale a pena complicar ?- perguntar ao professor de arquitetura

/**
 * @class RegisterStandController
 * @description Controller to register a new stand
 */

class RegisterStandController {
  constructor (standRepository) {
    this.standRepository = standRepository
  }

  /**
   * @description Method to execute http request for register stand
   * @param {*} request request object from express
   * @param {*} response response object from express
   * @returns response object from express
   */
  async execute (request, response) {
    let { name, location, phone, mobilephone, schedule } = request.body
    if (!name || !location || !phone || !mobilephone || !schedule) {
      return response.status(400).json({ message: 'Missing fields' })
    }
    if (name.length < 5) {
      return response.status(400).json({ message: 'Name must be at least 5 characters' })
    }
    if (location.length < 5) {
      return response.status(400).json({ message: 'Name must be at least 5 characters' })
    }
    
    const usecase = new RegisterStandUseCase(this.standRepository)
    const stand = await usecase.execute({
      name,
      location,
      mobilephone,
      schedule
    })

    if (!stand.success) {
      if (stand.error.message === 'Stand name already used.' || stand.error.message === 'Location is required' || stand.error.message === 'Mobile phone is required') {
        return response.status(400).json({ message: stand.error.message })
      } else {
        return response.status(500).json({ message: 'Internal server error' })
      }
    }
    return response.status(201).json(user.data)
  }
}

module.exports = RegisterStandController
