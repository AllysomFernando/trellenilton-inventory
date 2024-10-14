import { UserModel } from 'src/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { UserRepository } from 'src/domain/repository/user.repository'
import { BadRequestError } from '@/applications/errors/bad-request-erros'

export namespace GetUserByIdUseCase {
  export type Input = {
    id: number
  }

  export type Output = UserModel

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id é obrigatório.')
      }
      try {
        const entity = await this.userRepository.findById(input.id)
        return entity
      } catch (e) {
        throw new BadRequestError('Falha ao buscar o usuário com id informado.')
      }
    }
  }
}
