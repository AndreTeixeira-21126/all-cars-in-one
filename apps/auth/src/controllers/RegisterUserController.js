const RegisterUserUseCase = require('../usecases/RegisterUserUseCase/RegisterUser.usecase')

class RegisterUserController {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async execute (request, response) {
    const { email, name, password, confirmPassword } = request.body
    if (!email || !name || !password || !confirmPassword) {
      return response.status(400).send({ message: 'Missing fields' })
    }
    if (password.length < 8) {
      return response.status(400).send({ message: 'Password must be at least 8 characters' })
    }
    if (password === confirmPassword) {
      return response.status(400).send({ message: 'Passwords don t match' })
    }
    const usecase = new RegisterUserUseCase(this.userRepository)
    const user = await usecase.execute({
      name,
      email,
      password
    })
    return response.status(201).send(user)
  }
}

module.exports = RegisterUserController
