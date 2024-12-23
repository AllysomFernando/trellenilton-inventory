import { UserModel } from '@/domain/models/user'
import { UseCase as DefaultUseCase } from '../use-case'
import { BadRequestError } from '@/applications/errors/bad-request-erros'
import { UserRepository } from '@/domain/repository/user.repository'

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
        if (!entity) {
          throw new BadRequestError(
            'Falha ao buscar o usuário com id informado.'
          )
        }
        return entity
      } catch (e) {
        throw new BadRequestError('Usuário não encontrado.')
      }
    }
  }
}
