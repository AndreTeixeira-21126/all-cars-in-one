const Stand = require('../../entities/Stand')
const crypto = require('crypto') // This is a nodejs module, you can use uuid or other lib
const { Result, handleError } = require('../../util/Result')
const { Console } = require('console')

class RegisterStandUseCase {
  /**
     * @description Constructor of RegisterStandUseCase
     * @param {*} standRepository an StandRepository, it can be a in-memory or an mysql, postgres, etc
     */
  constructor (standRepository) {
    this.standRepository = standRepository
  }

  /**
   * @param {*} registerStandDto, An object with name, location, phone, mobilephone
   * @returns an result object with a boolean success property, data property and error property
   */
  async execute (registerStandDto) {
    /**
     * function handleError is a util function to handle errors from async functions
     */
    const withErrorHandling = handleError(async () => {
      const standAlreadyExists = await this.standRepository.findByName(registerStandDto.name)
      if (standAlreadyExists) {
        return Result.failed(new Error('Stand name already used'))
      }
      const id = crypto.randomUUID()
      console.log(registerStandDto)
      let stand = Stand.create(registerStandDto.name, registerStandDto.location, registerStandDto.phone, registerStandDto.mobilephone, id)
      stand = await this.standRepository.create(stand)
      return Result.success(stand.toJson())
    })
    return withErrorHandling()
  }
}

module.exports = RegisterStandUseCase
