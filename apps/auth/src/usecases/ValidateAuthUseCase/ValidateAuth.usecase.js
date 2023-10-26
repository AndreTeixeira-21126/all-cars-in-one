const { Result, handleError } = require('../../util/Result')

class ValidateAuthUseCase {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute (userObject) {
    const withErrorHandling = handleError(async () => {
      const user = await this.userRepository.findByEmail(userObject.email)
      if (!user || user.id !== userObject.id) {
        return Result.failed(new Error('Invalid authentication'))
      }
      return Result.success(user.toJson())
    })
    return withErrorHandling()
  }
}

module.exports = ValidateAuthUseCase
