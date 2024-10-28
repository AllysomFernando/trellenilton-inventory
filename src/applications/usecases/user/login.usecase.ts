import { UserModel } from '@/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { UserRepository } from '@/domain/repository/user.repository'

export namespace LoginUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    user: UserModel
    token: string
  }

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const { user, token } = await this.userRepository.login(
        input.email,
        input.password
      )
      if (!user || !token) {
        throw new BadRequestError('Erro ao logar')
      }
      return { user, token }
    }
  }
}
