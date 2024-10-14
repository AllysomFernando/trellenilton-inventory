import { UserModel } from '@/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { UserRepository } from '@/domain/repository/user.repository'

export namespace CreateUserUseCase {
  export type Input = {
    email: string
    name: string
    password: string
  }

  export type Output = UserModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.email || !input.name || !input.password) {
        throw new BadRequestError('Email, nome e senha são obrigatórios.')
      }
      const user = new UserModel()
      user.email = input.email
      user.name = input.name
      user.password = input.password
      try {
        const entity = await this.userRepository.save(user)
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao salvar o usuário.')
      }
    }
  }
}
